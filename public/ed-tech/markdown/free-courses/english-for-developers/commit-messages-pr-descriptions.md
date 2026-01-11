---
order: 38
slug: /english-for-developers/commit-messages-pr-descriptions
title: Commit Messages & PRs
description: Write clear commit messages and pull request descriptions that help your team understand your code changes. Learn conventions and best practices.
image: https://live.staticflickr.com/65535/55030591105_99dcef2a44_b.jpg
icon: commit
tags: ed-tech, english-learning, git, technical-writing
---
> Writing Effective Commit Messages and Pull Request Descriptions

# Commit Messages & PR Descriptions

Your commits and PRs tell the story of your code. Clear, well-written messages help reviewers, future developers, and your future self understand what changed and why.

## Why This Matters

### Your Code History is Documentation

**Commit messages are read**:
- During code reviews
- When debugging ("when was this introduced?")
- When searching history (`git log`, `git blame`)
- When writing release notes
- Years later by other developers

**Good messages**:
- Explain WHY, not just WHAT
- Save time for reviewers
- Create searchable history
- Show professionalism

**Bad messages**:
```
❌ "fix"
❌ "update"
❌ "WIP"
❌ "asdfasdf"
❌ "Final final FINAL version"
```

## Commit Message Structure

### The Anatomy of a Good Commit

**Format**:
```
<type>: <subject>

<body>

<footer>
```

**Example**:
```
feat: Add Redis caching to user API

Users were experiencing 2-3 second load times when fetching
their profile data. This adds Redis caching with a 15-minute
TTL to reduce database queries.

Performance improved from 2.5s to 200ms average.

Closes #1234
```

### The Subject Line

**Rules**:
1. **50 characters or less**
2. **Start with a type prefix** (optional but common)
3. **Use imperative mood** ("Add" not "Added" or "Adds")
4. **Don't end with period**
5. **Be specific**

**Type Prefixes**:
```
feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting (not CSS)
refactor: Code restructuring
test: Adding tests
chore: Maintenance
perf: Performance improvement
```

**Examples**:
```
✅ feat: Add password reset functionality
✅ fix: Resolve race condition in payment processing
✅ docs: Update API authentication guide
✅ refactor: Extract email service into separate module
✅ perf: Optimise database queries in user endpoint

❌ Fixed the bug (what bug?)
❌ Update files (what files? why?)
❌ Changes (not helpful)
❌ Implemented new feature (which one?)
```

**Imperative Mood**:
```
Think: "This commit will..."

✅ "This commit will add password reset" 
   → "Add password reset"

✅ "This commit will fix login bug"
   → "Fix login bug"

❌ "This commit added password reset"
   → "Added password reset" (wrong)

❌ "This commit adds password reset"
   → "Adds password reset" (wrong)
```

### The Body (Optional but Recommended)

**When to Include**:
- Complex changes
- Non-obvious decisions
- Context for future developers
- Performance implications
- Breaking changes

**What to Include**:
```
1. Why (motivation for the change)
2. What problem it solves
3. How it solves it (if not obvious)
4. Side effects or limitations
5. References (ticket numbers, docs)
```

**Example**:
```
refactor: Switch from MySQL to PostgreSQL

MySQL was causing deadlocks under high load during
concurrent writes to the users table. PostgreSQL handles
concurrent writes better with MVCC.

Migration:
- Exported data from MySQL
- Converted schema
- Updated connection strings
- Verified data integrity

Breaking change: Requires updating connection string in
all environments.

Related: #456, #789
```

**Body Guidelines**:
- Wrap at 72 characters
- Blank line between subject and body
- Use bullet points for lists
- Be concise but complete

### The Footer (Optional)

**Common Footers**:
```
Closes #123 (automatically closes issue)
Fixes #456 (same)
Related to #789
Breaking change: [description]
Reviewed-by: @alice
Co-authored-by: Bob <bob@example.com>
```

## Commit Message Patterns

### Bug Fixes

```
fix: Resolve authentication timeout on slow connections

Users on slow networks (>500ms latency) were getting logged
out during authentication. The timeout was set to 1 second,
which wasn't enough.

Increased timeout to 5 seconds and added retry logic.

Fixes #234
```

**Include**:
- What bug
- What caused it
- How you fixed it
- Related issues

### New Features

```
feat: Add file upload with drag and drop

Users can now drag files directly into the editor instead of
using the file picker. Supports multiple files and shows
upload progress.

Implementation uses HTML5 drag-and-drop API with fallback to
file input for older browsers.

Closes #567
```

**Include**:
- What feature
- Why it's useful
- How it works (briefly)
- Related tickets

### Refactoring

```
refactor: Extract authentication logic into separate service

The user controller was doing too much - handling HTTP,
database, and authentication. This extracts auth logic into
AuthService for better separation of concerns.

Benefits:
- Easier to test auth logic in isolation
- Can reuse auth in other controllers
- Clearer responsibilities

No functional changes.
```

**Include**:
- What you refactored
- Why (benefits)
- Confirmation of no behavior changes

### Performance

```
perf: Optimise database queries in dashboard endpoint

Dashboard was making 50+ separate database queries, causing
2-3 second load times. This combines them into 3 queries
using JOINs.

Before: 2.5s average
After: 300ms average

No changes to returned data structure.
```

**Include**:
- What you optimised
- Before/after metrics
- Confirmation of same behavior

### Documentation

```
docs: Add examples to API authentication guide

Several developers struggled with the OAuth flow. This adds
step-by-step examples with curl commands for:
- Getting access token
- Refreshing token
- Handling errors

Also added a troubleshooting section.
```

**Include**:
- What docs
- Why (who benefits)
- What was added

## Pull Request Descriptions

### PR Structure

**Template**:
```markdown
## What

Brief description of what this PR does.

## Why

Why is this change necessary? What problem does it solve?

## How

How does it work? (Technical details)

## Testing

How was this tested?

## Screenshots/Videos

(If applicable)

## Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Migrations included (if applicable)

## Related Issues

Closes #123
Related to #456
```

### Complete PR Example

```markdown
## What

Adds Redis caching to the user profile API endpoint.

## Why

Users were experiencing 2-3 second load times when viewing
profiles. The endpoint was making multiple database queries
for every request, even for data that doesn't change often.

## How

- Added Redis client configuration
- Wrapped user queries with caching layer
- Set 15-minute TTL on cached data
- Invalidate cache on user updates
- Fall back to database if Redis is down

Technical details:
- Using `ioredis` client
- Cache key format: `user:{userId}`
- Automatic serialization/deserialization
- LRU eviction policy

## Testing

- Unit tests for cache hit/miss scenarios
- Integration tests for cache invalidation
- Load tested with 1000 concurrent requests
- Verified cache fallback when Redis is down

Performance results:
- Before: 2.5s average, 4s p99
- After: 200ms average, 300ms p99
- 92% reduction in database queries

## Deployment Notes

Requires Redis instance:
- Dev/staging: Already set up
- Production: Need to provision Redis cluster

Environment variables needed:
```
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=xxx
```

## Breaking Changes

None. This is backward compatible.

## Screenshots

[Screenshot of improved load times]

## Checklist

- [x] Tests added and passing
- [x] Documentation updated
- [x] No breaking changes
- [x] Reviewed by @alice
- [ ] Redis provisioned in production (pending DevOps)

## Related Issues

Closes #1234
Related to #567 (general performance improvements)

## Review Focus

Please especially check:
1. Is 15-min TTL reasonable or should it be different?
2. Are there other endpoints we should cache similarly?
3. Any security concerns with caching user data?
```

### PR Title

**Format**: Same as commit message subject

```
✅ feat: Add Redis caching to user API
✅ fix: Resolve race condition in payment processing
✅ docs: Update deployment guide

❌ Feature/add-caching (too vague)
❌ WIP (not ready for review)
❌ Fix bug (which bug?)
```

### PR Description Guidelines

**Do**:
- Explain context (why)
- Show before/after if relevant
- Include screenshots/videos for UI changes
- List testing done
- Call out breaking changes
- Link related issues
- Guide reviewers on what to focus on
- Update as you make changes

**Don't**:
- Just say "see commits"
- Skip explanation
- Assume context is obvious
- Hide breaking changes
- Forget to link issues

## Conventional Commits

### What They Are

A standard format for commit messages. Many projects follow this.

**Format**:
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code change (no new feature/fix)
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Tooling, dependencies, etc.

**Scope** (optional): Part of codebase
```
feat(auth): Add OAuth support
fix(api): Resolve timeout in user endpoint
docs(readme): Update installation instructions
```

**Breaking Changes**:
```
feat!: Remove deprecated API endpoints

OR

feat: Remove deprecated API endpoints

BREAKING CHANGE: /v1/users endpoint has been removed.
Use /v2/users instead.
```

### Examples

**Simple**:
```
feat: Add dark mode
fix: Resolve memory leak in image processing
docs: Update contribution guidelines
```

**With Scope**:
```
feat(auth): Add two-factor authentication
fix(dashboard): Resolve chart rendering bug
perf(database): Optimise user queries
```

**With Body**:
```
feat(payments): Add Stripe integration

Allows users to pay via credit card using Stripe. Includes:
- Payment form with card validation
- Webhook handler for payment events
- Receipt generation

Closes #789
```

**Breaking Change**:
```
feat!: Upgrade to Node 18

BREAKING CHANGE: Node 16 is no longer supported. Update your
environment to Node 18+ before deploying.
```

## Git Workflow Best Practices

### Commit Frequency

**When to Commit**:
```
✅ Feature complete (small feature)
✅ Logical unit of work
✅ Tests pass
✅ Buildable/runnable

❌ Every line of code
❌ End of day ("WIP")
❌ Random checkpoints
```

**Commit Size**:
- One logical change per commit
- If fixing bug + refactoring → 2 commits
- If adding feature + tests → 1 commit (tests are part of feature)

### Commit Early vs. Clean History

**Two Approaches**:

**1. Commit Early, Squash Later**:
```
While working:
- Commit frequently (WIP commits OK)
- "WIP: Add auth form"
- "WIP: Fix validation"
- "WIP: Add tests"

Before PR:
- Squash into: "feat: Add authentication form"
```

**2. Commit Cleanly From Start**:
```
- Only commit when unit of work is done
- Write good message immediately
- No need to rewrite history
```

**Most Teams**: Approach 1 (commit early, squash before merge)

### Rewriting History

**When to Rewrite**:
```
✅ Before pushing (local only)
✅ Before merging PR (after review)
✅ To clean up WIP commits
✅ To fix typos in messages
```

**When NOT to Rewrite**:
```
❌ After pushing to shared branch
❌ On main/master branch
❌ After others have based work on your commits
```

**Tools**:
```bash
# Amend last commit
git commit --amend

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Squash all commits in branch
git rebase -i main
```

### Atomic Commits

**Principle**: Each commit should be a complete, logical unit

**Good** (atomic):
```
Commit 1: feat: Add user registration form
Commit 2: feat: Add email verification
Commit 3: feat: Add welcome email
```

**Bad** (not atomic):
```
Commit 1: feat: Add half of registration form
Commit 2: feat: Finish registration form + start email
Commit 3: fix: Fix bug from commit 1
```

**Benefits**:
- Easy to review
- Easy to revert
- Clear history
- Bisectable (can find bugs with `git bisect`)

## Code Review Communication

### Addressing Review Comments

**When Making Changes**:
```
Reviewer: "This function is doing too much. Can we split it?"

You reply:
✅ "Good catch! Split into validateUser() and saveUser(). 
Updated in latest commit."

❌ "Done" (what did you do?)
❌ "No" (why not? explain your reasoning)
❌ [No response, just push changes]
```

**If You Disagree**:
```
✅ "I see your point. My concern is X because Y. Would Z work
instead?"

✅ "Good suggestion! I considered that but chose this approach
because [reasoning]. What do you think?"

❌ "That won't work"
❌ "You're wrong"
```

**Types of Review Comments**:

**1. Must Fix**:
- Security issues
- Bugs
- Breaking changes

**2. Should Fix**:
- Code quality
- Performance
- Maintainability

**3. Nit** (optional):
- Style preferences
- Minor improvements
- "Nit: Could rename this variable"

### Responding to Feedback

**Template**:
```
For each comment:

Minor change:
"✅ Fixed in abc123"

Bigger change:
"✅ Good idea! I refactored this to [description].
See commit abc123."

Disagree:
"I chose X instead of Y because [reasoning]. Let me know if
you still have concerns."

Questions:
"Can you clarify what you mean by X?"
"Are you suggesting Y or Z?"
```

**Be Professional**:
```
✅ "Thanks for catching that!"
✅ "Great suggestion!"
✅ "Good point, I missed that"
✅ "I learned something new, thanks!"

❌ "Obviously I know that"
❌ "This is how I always do it"
❌ "You don't understand"
```

## Common Mistakes

### Mistake 1: Vague Messages

```
❌ "fix bug"
❌ "update code"
❌ "changes"

✅ "fix: Resolve null pointer in user login"
✅ "refactor: Extract email validation into utility"
✅ "feat: Add support for PostgreSQL database"
```

### Mistake 2: Too Much in One Commit

```
❌ "Add feature X, fix bug Y, refactor Z, update docs"

✅ Split into:
1. "feat: Add feature X"
2. "fix: Resolve bug Y"
3. "refactor: Clean up Z"
4. "docs: Update API documentation"
```

### Mistake 3: Past Tense

```
❌ "Added authentication"
❌ "Fixed the bug"

✅ "Add authentication"
✅ "Fix login bug"
```

### Mistake 4: No Context

```
❌ 
Title: "Fix error"
Body: [empty]

✅
Title: "fix: Resolve 500 error in payment endpoint"
Body: "Payment endpoint was throwing 500 when credit card
expired. Added proper error handling and returns 400 with
clear message now."
```

### Mistake 5: Mixing Concerns

```
❌ One commit:
- Add new feature
- Fix unrelated bug
- Refactor other code
- Update dependencies

✅ Separate commits:
1. feat: Add new feature
2. fix: Resolve login bug
3. refactor: Simplify validation logic
4. chore: Update dependencies
```

## Tools & Automation

### Commit Message Linting

**Commitlint**:
```bash
# Install
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Configure
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# Use with Husky (git hooks)
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

**Enforces**:
- Type prefix (feat, fix, etc.)
- Subject length
- Format

### Commit Templates

**Create Template**:
```bash
# ~/.gitmessage.txt
<type>: <subject>

Why:

How:

Closes #
```

**Configure Git**:
```bash
git config --global commit.template ~/.gitmessage.txt
```

**Now**: `git commit` opens template in editor

### PR Templates

**In Repository**: `.github/pull_request_template.md`

```markdown
## What

[Description]

## Why

[Problem this solves]

## Testing

[How you tested]

## Checklist

- [ ] Tests added
- [ ] Documentation updated
- [ ] No breaking changes

## Related Issues

Closes #
```

**Auto-Fills**: Every new PR

### GitMoji

**What**: Using emoji in commits (optional, some teams love it)

```
✨ feat: Add new feature
🐛 fix: Fix bug
📝 docs: Update documentation
♻️ refactor: Refactor code
⚡ perf: Performance improvement
✅ test: Add tests
```

**Tool**: `gitmoji-cli`

## Team Standards

### Agree on Conventions

**What to Decide**:
1. Commit message format (conventional commits? freeform?)
2. Commit frequency (commit often? only when done?)
3. Merge strategy (squash? merge commits? rebase?)
4. PR approval requirements (1? 2? specific people?)
5. Branching strategy (git-flow? trunk-based?)

### Document It

**In CONTRIBUTING.md**:
```markdown
## Commit Messages

We use Conventional Commits:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- refactor: Code change (no new feature)

Example:
```
feat(auth): Add OAuth support

Allows users to login with GitHub. 
Closes #123
```

## Pull Requests

- Title: Same format as commits
- Description: Use the PR template
- At least 1 approval required
- All tests must pass
- Squash commits when merging
```

## Practice Exercise

### Rewrite These Commits

**Bad**:
```
1. "update"
2. "fix"
3. "WIP"
4. "Final version"
```

**Better**:
```
1. "docs: Update API authentication guide"
2. "fix: Resolve timeout in user endpoint"
3. "feat: Add OAuth login support" (no WIP!)
4. "refactor: Simplify error handling"
```

### Write a PR Description

**Scenario**: You added a search feature to the app

**Your Turn**: Write:
1. PR title
2. What it does
3. Why it's useful
4. How to test

**Example**:
```
## Title
feat: Add full-text search to documentation

## What
Adds search functionality to the docs site using Algolia.
Users can search all documentation pages with instant results.

## Why
Users were struggling to find information in our growing
docs. The table of contents wasn't enough.

## How
- Integrated Algolia DocSearch
- Added search bar to header
- Indexes all markdown files on build
- Real-time search with keyboard shortcuts

## Testing
1. Go to /docs
2. Click search (or press ⌘K)
3. Type "authentication"
4. See instant results
5. Press Enter to navigate

## Screenshots
[Screenshot]

## Related
Closes #456
```

## Next Steps

Improve your technical writing:
- Master [Technical Writing](/technical-writing)
- Write better [README files](/technical-writing/readme-best-practices)
- Improve [Code Review Communication](/code-review-communication)
- Practice [Documentation](/documentation-tools-developers)

Your commits are how you communicate through code. Make them clear, informative, and helpful for everyone who reads them—including yourself in six months.
