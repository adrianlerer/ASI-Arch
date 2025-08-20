# ASI-Arch Meta Repository Agreements

## 🎯 Mission Statement

The ASI-Arch ecosystem implements a **nursery of evolutionary and improvable AI agents** based on Rich Sutton's Oak Architecture principles. Our mission is to create a continuously evolving ecosystem where AI agents improve through experience, develop open abstractions, and achieve general intelligence through runtime learning.

## 🏛️ Governance Principles

### Core Values
1. **🌐 Open Abstraction**: Unlimited concept development constrained only by computational resources
2. **🔬 Experiential Learning**: All knowledge acquired through runtime experience, not design-time hardcoding
3. **🎯 Generality**: No domain-specific knowledge embedded in core architectures
4. **🔄 Continuous Evolution**: Agents must improve continuously through the 8-step Oak loop
5. **🤝 Collaborative Intelligence**: Ecosystem of cooperating agents rather than isolated models

### Quality Standards
- **MIT License Required**: All Lite templates and public APIs must use MIT license
- **Security First**: No critical CVEs in dependencies
- **Test Coverage**: Minimum 80% code coverage for core components
- **Documentation**: Complete API documentation and usage examples
- **Reproducibility**: All experiments must be reproducible with fixed seeds

## 📋 Curation Policies

### Agent Acceptance Criteria

#### Technical Requirements
- ✅ **License Compatibility**: MIT, Apache-2.0, BSD-2/3, MPL-2.0 (case-by-case)
- ✅ **Health Indicators**: Active development (commits within 90 days)
- ✅ **Test Suite**: Visible testing framework (Jest, Vitest, pytest, etc.)
- ✅ **Security**: No known critical vulnerabilities
- ✅ **Documentation**: README, CONTRIBUTING, SECURITY, LICENSE present

#### Functional Requirements
- ✅ **Oak Compatibility**: Can be adapted to Oak Architecture interfaces
- ✅ **Learning Capability**: Demonstrates learning from experience
- ✅ **Abstraction Potential**: Can develop higher-level concepts
- ✅ **Generalizable**: Not hardcoded for specific domains
- ✅ **Measurable Performance**: Quantifiable improvement metrics

#### Architectural Requirements
- ✅ **Modular Design**: Clean separation of concerns
- ✅ **Extensible**: Supports evolutionary modifications
- ✅ **Observable**: Provides telemetry and monitoring hooks
- ✅ **Scalable**: Can handle increasing complexity
- ✅ **Fault Tolerant**: Graceful degradation under failures

### Rejection Criteria (Hard Blocks)

#### License Blocks
- ❌ **AGPL-3.0**: Copyleft restrictions incompatible with commercial use
- ❌ **GPL-3.0**: Strong copyleft requirements
- ❌ **SSPL**: MongoDB-style restrictions on service providers
- ❌ **Commons Clause**: Anti-commercial clauses
- ❌ **PolyForm Licenses**: Various commercial restrictions
- ❌ **Prosperity License**: Time-limited commercial restrictions
- ❌ **Elastic License v2**: Service provider restrictions
- ❌ **BSL with Production Restrictions**: Business Source License limitations
- ❌ **Research/Non-Commercial Only**: Academic-only licenses
- ❌ **Proprietary EULA**: Non-OSS license agreements

#### Technical Blocks
- ❌ **Security Vulnerabilities**: Critical CVEs without patches
- ❌ **Abandoned Projects**: No activity >180 days without clear maintenance
- ❌ **Broken Dependencies**: Unresolvable dependency conflicts
- ❌ **No Test Coverage**: Complete absence of testing
- ❌ **Hardcoded Domains**: Inflexible domain-specific implementations

#### Architectural Blocks
- ❌ **Monolithic Design**: Cannot be decomposed or extended
- ❌ **Proprietary Dependencies**: Requires proprietary software/services
- ❌ **Resource Excessive**: Unreasonable computational requirements
- ❌ **Network Dependencies**: Requires constant internet connectivity
- ❌ **Data Exfiltration**: Sends data to external services without consent

## 🔄 Evolutionary Process

### The 8-Step Oak Loop
1. **Learn Policies & Values**: Maximize reward through experience
2. **Generate Features**: Create new state representations
3. **Rank Features**: Order by utility and potential
4. **Create Subproblems**: Feature-achievement challenges
5. **Learn Solutions**: Develop options for subproblems
6. **Model Transitions**: Predict consequences of actions
7. **Plan Actions**: Use models for multi-step planning
8. **Maintain Metadata**: Track utility and performance

### Evolution Cycle
- **Mutation**: Random perturbations to agent parameters
- **Crossover**: Knowledge sharing between high-performing agents
- **Selection**: Tournament selection with elitism
- **Evaluation**: Multi-metric fitness assessment

### Performance Metrics
- **Robustness**: Performance stability across conditions
- **Reproducibility**: Consistent results with same inputs
- **Latency**: Response time for decisions and actions
- **Cost**: Computational resource efficiency
- **Adaptability**: Speed of learning new tasks
- **Generalization**: Performance on unseen problems

## 📊 Quality Gates

### Continuous Integration
- **Build Success**: All repositories must build without errors
- **Test Passage**: All tests must pass in CI/CD
- **Lint Compliance**: Code style and quality checks
- **Security Scanning**: Dependency vulnerability analysis
- **Documentation**: Auto-generated API docs must be current

### Release Criteria
- **Semantic Versioning**: Proper version increments (Major.Minor.Patch)
- **Changelog**: Documented changes for each release
- **Backward Compatibility**: Maintained across minor versions
- **Migration Guides**: For breaking changes in major versions
- **Performance Benchmarks**: No regressions in key metrics

### Code Review Standards
- **Two-Reviewer Rule**: All PRs require two approvals
- **Automated Checks**: CI must pass before merge
- **Documentation Updates**: Changes must include doc updates
- **Test Coverage**: New code must include tests
- **Security Review**: Changes affecting security need specialist review

## 🔧 Repository Management

### Branch Strategy
- **Main Branch**: Production-ready code, protected
- **Development Branch**: Integration branch for features
- **Feature Branches**: Individual feature development
- **Release Branches**: Release preparation and hotfixes

### Issue Management
- **Labels**: Standardized labels across repositories
- **Templates**: Issue and PR templates for consistency
- **Milestones**: Aligned with ecosystem roadmap
- **Projects**: Kanban boards for tracking progress

### Dependency Management
- **Automated Updates**: Dependabot for security patches
- **Version Pinning**: Lock major versions, allow minor updates
- **License Tracking**: Monitor dependency license changes
- **Vulnerability Scanning**: Regular security audits

## 🚀 Deployment Standards

### Environment Consistency
- **Docker Containers**: Consistent runtime environments
- **Configuration Management**: Environment-specific configs
- **Health Checks**: Monitoring and alerting setup
- **Scaling Policies**: Auto-scaling based on load

### Release Pipeline
- **Automated Testing**: Full test suite on every commit
- **Staging Deployment**: Testing in production-like environment
- **Canary Releases**: Gradual rollout of changes
- **Rollback Capability**: Quick reversion if issues detected

### Monitoring & Observability
- **Metrics Collection**: Performance and business metrics
- **Log Aggregation**: Centralized logging system
- **Distributed Tracing**: Request flow tracking
- **Alerting**: Proactive issue detection and notification

## 🤝 Community Guidelines

### Contribution Process
1. **Fork Repository**: Create personal fork for development
2. **Create Feature Branch**: Work on isolated feature branch
3. **Implement Changes**: Follow coding standards and practices
4. **Write Tests**: Ensure comprehensive test coverage
5. **Update Documentation**: Include relevant documentation updates
6. **Submit Pull Request**: Use PR template and request review
7. **Address Feedback**: Respond to reviewer comments
8. **Merge**: Maintainer merges after approval

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Architecture discussions and questions
- **Security**: Private reporting for security vulnerabilities
- **Community**: Public forums for general discussions

### Code of Conduct
- **Respectful Interaction**: Professional and courteous communication
- **Inclusive Environment**: Welcome contributors from all backgrounds
- **Constructive Feedback**: Focus on improving code and ideas
- **Privacy Respect**: Protect personal and sensitive information
- **Attribution**: Proper credit for contributions and ideas

## 📈 Success Metrics

### Ecosystem Health
- **Active Repositories**: Number of actively maintained repos
- **Contribution Rate**: PRs and issues per month
- **Agent Diversity**: Variety of agent types and capabilities
- **Performance Trends**: Improvement in key metrics over time

### Adoption Metrics
- **Download Statistics**: Package download counts
- **Star Growth**: GitHub star accumulation rate
- **Fork Activity**: Repository fork and contribution rates
- **Usage Examples**: Community-created implementations

### Technical Metrics
- **Code Coverage**: Percentage of code covered by tests
- **Bug Density**: Bugs per lines of code
- **Response Time**: Time to resolve issues and PRs
- **Security Score**: Automated security assessment results

## 🔮 Future Roadmap

### Short Term (3-6 months)
- Complete initial repository setup
- Implement core SDK and interfaces
- Launch first Lite API templates
- Establish CI/CD pipelines

### Medium Term (6-12 months)
- Deploy production agent coordinators
- Integrate major open-source agents
- Implement cross-repository evolution
- Launch public API services

### Long Term (1-2 years)
- Achieve self-improving agent ecosystem
- Demonstrate emergent intelligence behaviors
- Scale to thousands of cooperating agents
- Establish industry partnerships

---

*This document evolves with the ecosystem. Propose changes through pull requests to maintain community consensus.*