// Replacement for `changeset publish` that uses npm staged publishing.
//
// `npm stage publish` uploads the tarball to the npm stage queue through the
// trusted publisher (OIDC). The version only goes live after a maintainer
// approves it with 2FA (`npm stage approve <stage-id>` or on npmjs.com).
//
// changesets/action detects a release in a single-package repo by looking for a
// "New tag:" line on stdout. It then pushes the `v<version>` tag and creates the
// GitHub release, so this script creates the tag locally and prints that line.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const { name, version } = JSON.parse(readFileSync("package.json", "utf8"));
const tag = `v${version}`;

const run = (command, args, options = {}) =>
  (execFileSync(command, args, { encoding: "utf8", ...options }) ?? "").trim();

const isPublished = () => {
  try {
    return run("npm", ["view", `${name}@${version}`, "version"]) === version;
  } catch {
    return false;
  }
};

// The tag is pushed right after staging, so it also marks a version that is
// staged and still waiting for approval.
const isTagged = () =>
  run("git", ["ls-remote", "--tags", "origin", `refs/tags/${tag}`]) !== "";

const log = (message) => process.stdout.write(`${message}\n`);

if (isPublished()) {
  log(`${name}@${version} is already published, skipping.`);
} else if (isTagged()) {
  log(`${tag} already exists, ${name}@${version} is staged, skipping.`);
} else {
  run("npm", ["stage", "publish"], { stdio: "inherit" });
  run("git", ["tag", tag]);

  log(`Staged ${name}@${version}, approve it with 2FA to publish.`);
  log(`New tag: ${tag}`);
}
