---
order: 26
slug: /english-for-developers/technical-vocabulary
title: Technical Vocabulary
description: Master essential technical vocabulary for software development. Learn programming terms, API terminology, and technical expressions used in global development teams.
image: https://live.staticflickr.com/65535/55021544964_727c263c48_b.jpg
icon: spellcheck
tags: ed-tech, english-learning, vocabulary, technical-terms
---
> Building Your Technical English Vocabulary

# Technical Vocabulary for Developers

Technical vocabulary is the foundation of effective developer communication. While general English skills matter, specialised terminology enables precise, efficient communication with global teams and stakeholders.

## Core Programming Vocabulary

### Code Structure Terms

**Functions and Methods**:
- **Invoke/Call**: Execute a function (`invoke the API`, `call the method`)
- **Return**: Send back a value (`returns a promise`, `return early`)
- **Pass**: Provide arguments (`pass parameters`, `pass by reference`)
- **Declare**: Define a variable or function (`declare a constant`)
- **Initialize**: Set initial value (`initialize the array`)

**Control Flow**:
- **Iterate**: Loop through items (`iterate over the collection`)
- **Traverse**: Move through data structures (`traverse the tree`)
- **Branch**: Conditional execution (`branch on user input`)
- **Break**: Exit a loop prematurely
- **Continue**: Skip to next iteration

### Data and State

**Common Expressions**:
- **Mutate**: Change existing data (`don't mutate the original array`)
- **Immutable**: Cannot be changed (`immutable data structures`)
- **Persist**: Save permanently (`persist to database`)
- **Cache**: Store for quick retrieval
- **Serialize**: Convert to storable format
- **Deserialize**: Convert back from stored format

**State Management**:
- **Stateful**: Maintains data across operations
- **Stateless**: No retained information between requests
- **Idempotent**: Same result regardless of repetition
- **Side effect**: Unintended external change

## Architecture and Design

### System Design Terms

**Scalability**:
- **Scale up/vertically**: Add resources to single machine
- **Scale out/horizontally**: Add more machines
- **Load balancing**: Distribute work across servers
- **Bottleneck**: Performance limitation point
- **Throughput**: Amount processed per time unit
- **Latency**: Time delay in system response

**Architectural Patterns**:
- **Monolithic**: Single unified application
- **Microservices**: Independent deployable services
- **Event-driven**: Responds to events/messages
- **Serverless**: Cloud-managed infrastructure
- **Containerized**: Packaged with dependencies

### API and Integration

**API Terminology**:
- **Endpoint**: Specific API URL path
- **Payload**: Data sent in request/response
- **Header**: Metadata in HTTP request
- **Query parameter**: URL-encoded data (`?key=value`)
- **Rate limiting**: Request frequency restrictions
- **Pagination**: Breaking results into pages

**Integration Patterns**:
- **RESTful**: Resource-based API architecture
- **GraphQL**: Query language for APIs
- **Webhook**: HTTP callback on event
- **Polling**: Repeated checking for updates
- **Streaming**: Continuous data flow

## Development Process

### Version Control

**Git Vocabulary**:
- **Commit**: Save changes (`commit your changes`)
- **Push**: Send to remote (`push to origin`)
- **Pull**: Retrieve from remote (`pull the latest`)
- **Merge**: Combine branches (`merge feature into main`)
- **Rebase**: Reapply commits on base (`rebase on main`)
- **Cherry-pick**: Apply specific commit elsewhere
- **Stash**: Temporarily save uncommitted changes
- **Conflict**: Overlapping changes requiring resolution

**Branch Management**:
- **Feature branch**: Development for specific feature
- **Hotfix**: Urgent production fix
- **Release branch**: Preparing production release
- **Main/master**: Primary stable branch
- **Upstream**: Original repository
- **Fork**: Personal copy of repository

### Code Review

**Feedback Language**:
- **Nit**: Minor, non-critical issue (`nit: typo in comment`)
- **Blocker**: Must be fixed before merge
- **LGTM**: "Looks good to me" (approval)
- **WIP**: Work in progress (not ready)
- **RFC**: Request for comments (seeking feedback)
- **Breaking change**: Incompatible with previous version

**Code Quality**:
- **Refactor**: Restructure without changing behavior
- **Optimise**: Improve performance
- **Simplify**: Reduce complexity
- **Abstract**: Generalize for reusability
- **Decouple**: Reduce dependencies

## Performance and Optimization

### Performance Terms

**Metrics**:
- **Benchmark**: Performance measurement test
- **Profiling**: Analyzing resource usage
- **Memory leak**: Unreleased memory allocation
- **CPU-bound**: Limited by processor speed
- **I/O-bound**: Limited by input/output operations
- **Network-bound**: Limited by network speed

**Optimization Strategies**:
- **Lazy loading**: Load only when needed
- **Eager loading**: Load everything upfront
- **Memoization**: Cache function results
- **Debouncing**: Delay execution until pause
- **Throttling**: Limit execution frequency
- **Batching**: Group operations together

### Database and Storage

**Database Operations**:
- **Query**: Request data (`run a query`)
- **Index**: Performance optimization structure
- **Transaction**: Atomic set of operations
- **Rollback**: Undo transaction
- **Migration**: Schema change script
- **Seed**: Initialize with test data

**Data Patterns**:
- **CRUD**: Create, Read, Update, Delete
- **ORM**: Object-relational mapping
- **Schema**: Database structure definition
- **Normalization**: Organize to reduce redundancy
- **Denormalization**: Optimise for read performance

## Testing and Quality

### Testing Vocabulary

**Test Types**:
- **Unit test**: Test individual component
- **Integration test**: Test component interaction
- **E2E test**: End-to-end user flow test
- **Regression test**: Verify fixes don't break features
- **Smoke test**: Quick basic functionality check
- **Load test**: Performance under high usage

**Test Concepts**:
- **Mock**: Simulated object for testing
- **Stub**: Predefined responses for testing
- **Fixture**: Fixed test data/environment
- **Assertion**: Expected outcome verification
- **Coverage**: Percentage of code tested
- **Flaky test**: Inconsistently failing test

## DevOps and Infrastructure

### Deployment Terms

**CI/CD**:
- **Continuous Integration**: Automated build/test
- **Continuous Deployment**: Automated production release
- **Pipeline**: Automated workflow stages
- **Artifact**: Built output package
- **Rollout**: Gradual deployment
- **Rollback**: Revert to previous version

**Infrastructure**:
- **Provisioning**: Setting up resources
- **Infrastructure as Code**: Config files for infrastructure
- **Container**: Isolated application environment
- **Orchestration**: Managing containers at scale
- **Service mesh**: Infrastructure layer for microservices

## Common Phrasal Verbs in Tech

### Development Actions

- **Set up**: Configure/initialize (`set up the environment`)
- **Spin up**: Start instance/server (`spin up a container`)
- **Tear down**: Dismantle/cleanup (`tear down test environment`)
- **Kick off**: Start process (`kick off the build`)
- **Wrap up**: Complete/finish (`wrap up the feature`)
- **Roll out**: Deploy/release (`roll out the update`)
- **Roll back**: Revert changes (`roll back the deployment`)
- **Break down**: Decompose into parts (`break down the task`)
- **Bring up**: Start/launch (`bring up the server`)
- **Shut down**: Stop/terminate (`shut down the service`)

### Troubleshooting

- **Track down**: Find/locate (`track down the bug`)
- **Pin down**: Identify precisely (`pin down the issue`)
- **Narrow down**: Reduce possibilities (`narrow down the cause`)
- **Rule out**: Eliminate as possibility (`rule out network issues`)
- **Work around**: Temporary solution (`work around the limitation`)
- **Fall back**: Use alternative (`fall back to cached data`)

## Practical Usage

### In Code Reviews

**Constructive Feedback**:
- "Consider extracting this logic into a separate function"
- "This could be refactored to reduce duplication"
- "What if we memoize this computation?"
- "Would it make sense to add error handling here?"

**Asking Questions**:
- "Could you elaborate on why we need this check?"
- "How does this handle edge cases?"
- "What's the performance impact of this approach?"
- "Is this backwards compatible?"

### In Stand-ups

**Status Updates**:
- "I'm currently working on implementing the auth flow"
- "Yesterday I fixed the pagination bug and deployed the hotfix"
- "I'm blocked by the API design review"
- "I'll be wrapping up the feature branch today"

### In Documentation

**Clear Technical Writing**:
- Use active voice: "The function returns..." not "A value is returned..."
- Be specific: "Throws TypeError" not "might cause problems"
- Use consistent terminology throughout
- Define acronyms on first use

## Learning Strategies

### Building Vocabulary

1. **Read Technical Documentation**: Official docs use precise terminology
2. **Follow Tech Blogs**: Learn contextual usage
3. **Participate in Code Reviews**: See vocabulary in practice
4. **Watch Conference Talks**: Hear native speakers using terms
5. **Contribute to Open Source**: Practice in real contexts

### Practice Techniques

**Active Learning**:
- Create flashcards for new terms
- Write technical blog posts
- Explain concepts in English to others
- Participate in English-language forums (Stack Overflow, Reddit)
- Comment on GitHub issues in English

**Contextual Practice**:
- Rewrite documentation in your own words
- Translate technical articles from your native language
- Record yourself explaining code
- Join English-language developer communities

## Common Mistakes to Avoid

### False Friends

Terms that sound like native language words but mean different things:
- **Actual** vs **Current** (not "actual time" but "current time")
- **Eventually** vs **Possibly** (means "in the end", not "maybe")
- **Library** vs **Bookstore** (code library, not place to buy books)

### Precision Matters

- Don't say "run" when you mean "execute," "deploy," or "start"
- Use "implement" for creating, "invoke" for calling
- Distinguish "error" (code problem) from "mistake" (human action)
- "Fix" implies correction, "patch" suggests temporary solution

## Resources for Continued Learning

### Recommended Reading

- **Official Documentation**: React, TypeScript, AWS docs
- **Technical Blogs**: Martin Fowler, CSS-Tricks, Dev.to
- **Style Guides**: Google Developer Documentation Style Guide
- **Books**: "The Pragmatic Programmer," "Clean Code"

### Online Tools

- **Stack Overflow**: Real usage in Q&A
- **GitHub**: Read native speakers' code comments
- **Technical Podcasts**: Syntax.fm, Software Engineering Daily
- **YouTube**: Coding tutorials by native speakers

## Next Steps

Master technical vocabulary to:
- Participate confidently in [Code Reviews](/code-review-communication)
- Write effective [Technical Documentation](/documentation-skills)
- Communicate in [Global Software Teams](/global-software-teams)
- Excel in [Developer Interviews](/developer-interviews)

Technical English fluency is a skill built through consistent practice and real-world application. Focus on learning terms you encounter daily, and gradually expand to adjacent domains.
