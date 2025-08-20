# Contributing to ASI-Arch Meta

Thank you for your interest in contributing to the ASI-Arch Meta-Agent system! This project implements Rich Sutton's Oak Architecture principles to create a nursery of evolutionary and improvable AI agents.

## 🎯 Project Vision

We're building an ecosystem where AI agents continuously improve through experience, develop open abstractions, and achieve general intelligence through runtime learning. Every contribution helps advance this vision.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Basic understanding of TypeScript
- Familiarity with AI/ML concepts (helpful but not required)

### Local Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/[your-username]/asi-arch-meta
   cd asi-arch-meta
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 🏗️ Architecture Overview

The project follows Oak Architecture principles:

- **Options**: Policies with termination conditions
- **Knowledge**: Transition models and predictions
- **Subproblems**: Feature achievement challenges
- **Evolution**: Continuous improvement through the 8-step loop

### Key Directories

- `src/`: Core TypeScript interfaces and implementations
- `meta/`: Oak Architecture specific components
- `meta/adapters/`: External agent integrations
- `meta/evolution/`: Evolutionary algorithms
- `tests/`: Test suites

## 📝 Contribution Guidelines

### Issue Types

- **🐛 Bug Reports**: Issues with existing functionality
- **✨ Feature Requests**: New capabilities or improvements
- **📚 Documentation**: Improvements to docs or examples
- **🔧 Maintenance**: Refactoring, dependencies, tooling
- **🧪 Research**: Experimental features or algorithms

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the coding standards (ESLint + Prettier)
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

4. **Commit with Conventional Commits**
   ```bash
   git commit -m "feat: add new evolutionary operator"
   git commit -m "fix: resolve agent selection bug"
   git commit -m "docs: update Oak Architecture guide"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards

#### TypeScript Style
- Use strict TypeScript configurations
- Prefer interfaces over types for public APIs
- Document complex algorithms with comments
- Use descriptive variable and function names

#### Testing
- Write unit tests for all new functions
- Use integration tests for evolutionary loops
- Mock external dependencies appropriately
- Aim for >80% code coverage

#### Documentation
- Update README.md for user-facing changes
- Document APIs with JSDoc comments
- Include usage examples in code comments
- Update CHANGELOG.md for releases

## 🧬 Working with Evolution

### Adding New Evolutionary Operators

1. **Implement the Interface**
   ```typescript
   import { IEvolutionaryOperator } from '../interfaces/IMetaAgent';
   
   export class MyOperator implements IEvolutionaryOperator {
     async mutate(agent: IMetaAgent): Promise<IMetaAgent> {
       // Your mutation logic
     }
     
     async evaluate(agent: IMetaAgent): Promise<number> {
       // Your fitness evaluation
     }
   }
   ```

2. **Add Tests**
   ```typescript
   describe('MyOperator', () => {
     it('should improve agent fitness', async () => {
       // Test implementation
     });
   });
   ```

3. **Register in Evolution Loop**
   ```typescript
   // In meta/evolution/loop.ts
   import { MyOperator } from './operators/MyOperator';
   ```

### Creating Agent Adapters

1. **Implement IMetaAgent Interface**
   ```typescript
   export class MyAgentAdapter implements IMetaAgent {
     // Implement all required methods
     async learnPoliciesAndValues(): Promise<void> {
       // Your implementation
     }
     // ... other methods
   }
   ```

2. **Add Configuration Schema**
   ```typescript
   export interface MyAgentConfig extends IAgentConfig {
     mySpecificParam: string;
     anotherParam: number;
   }
   ```

3. **Write Integration Tests**
   ```typescript
   describe('MyAgentAdapter', () => {
     it('completes Oak Architecture cycle', async () => {
       // Test the 8-step loop
     });
   });
   ```

## 🔬 Research Contributions

We welcome research contributions that advance the state of the art:

### Experimental Features
- New evolutionary algorithms
- Novel fitness functions
- Advanced agent architectures
- Performance optimizations

### Research Process
1. **Create Research Issue**: Propose your research direction
2. **Experimental Branch**: Work in `research/your-topic` branch
3. **Document Results**: Include performance metrics and analysis
4. **Peer Review**: Get feedback from maintainers
5. **Integration**: Merge successful experiments to main

### Publishing Research
- We encourage publishing research based on this codebase
- Please cite the project and include relevant contributors
- Share your publications with the community

## 🤝 Community Guidelines

### Communication
- **Be Respectful**: Professional and courteous interaction
- **Be Inclusive**: Welcome contributors from all backgrounds
- **Be Constructive**: Focus on improving ideas and code
- **Be Patient**: Remember that everyone is learning

### Getting Help
- **GitHub Issues**: Technical questions and bug reports
- **Discussions**: Architecture discussions and ideas
- **Code Review**: Ask for feedback on your approaches

### Recognition
- All contributors are acknowledged in releases
- Significant contributions may be highlighted in documentation
- Research contributions are credited in publications

## 🔧 Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Individual feature development
- `research/*`: Experimental work
- `hotfix/*`: Critical bug fixes

### Release Process
1. **Version Bump**: Follow semantic versioning
2. **Changelog**: Update CHANGELOG.md
3. **Testing**: Full test suite must pass
4. **Documentation**: Ensure docs are current
5. **Release**: Tag and publish

### Performance Considerations
- Profile evolutionary loops for performance
- Monitor memory usage during long runs
- Optimize critical paths in agent interactions
- Consider parallel processing opportunities

## 📊 Quality Assurance

### Code Review Checklist
- [ ] Code follows project style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Performance impact is considered
- [ ] Security implications are addressed
- [ ] Breaking changes are documented

### Testing Strategy
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Agent interactions and workflows
- **Performance Tests**: Evolution loop benchmarks
- **End-to-End Tests**: Complete system functionality

## 🚨 Security Guidelines

### Reporting Security Issues
- **Do NOT** open public issues for security vulnerabilities
- Email security concerns to the maintainers privately
- Include detailed reproduction steps if possible
- Allow reasonable time for patching before disclosure

### Security Best Practices
- Validate all external inputs
- Use secure defaults in configurations
- Avoid exposing sensitive information in logs
- Keep dependencies updated

## 📈 Metrics and Success

### Contribution Success Metrics
- **Code Quality**: Maintainable, tested, documented code
- **Performance**: Improvements in evolution speed or agent quality
- **Innovation**: Novel approaches to agent improvement
- **Community**: Helping others and building inclusive environment

### Project Success Metrics
- **Agent Diversity**: Variety of successful agent types
- **Evolution Speed**: Time to achieve performance improvements
- **Ecosystem Health**: Active contributors and usage
- **Research Impact**: Publications and citations

## 🙏 Recognition

### Contributors
All contributors are listed in:
- GitHub Contributors page
- CHANGELOG.md for significant contributions
- Academic papers for research contributions

### Types of Contributions
- 💻 **Code**: Implementation and bug fixes
- 📖 **Documentation**: Writing and editing docs
- 🎨 **Design**: UI/UX and architecture improvements
- 🧪 **Testing**: Writing tests and finding bugs
- 💡 **Ideas**: Feature suggestions and architectural input
- ❓ **Support**: Helping other contributors

---

Thank you for contributing to the future of AI! Every contribution, no matter how small, helps advance our understanding and implementation of truly intelligent systems.

For questions about contributing, please open a discussion or contact the maintainers.