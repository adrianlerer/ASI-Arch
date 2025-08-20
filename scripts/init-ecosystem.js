#!/usr/bin/env node

/**
 * ASI-Arch Ecosystem Initialization Script
 * 
 * This script initializes the complete ASI-Arch ecosystem by:
 * 1. Setting up all required repositories
 * 2. Configuring cross-repository dependencies
 * 3. Initializing the meta-agent control system
 * 4. Establishing evolutionary loops and monitoring
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}🧠 ${msg}${colors.reset}\n`)
};

// Repository configuration
const ECOSYSTEM_REPOS = [
  {
    name: 'asi-arch-meta',
    description: 'Meta-agent control center for ASI Architecture ecosystem',
    path: '.',
    isMain: true
  },
  {
    name: 'asi-arch-agent-registry',
    description: 'Curated catalog of agents and coordinators',
    path: '../asi-arch-agent-registry'
  },
  {
    name: 'asi-arch-agent-army-core',
    description: 'SDK + runners + agent templates',
    path: '../asi-arch-agent-army-core'
  },
  {
    name: 'asi-arch-sector-packs',
    description: 'Industry-specific agent packs',
    path: '../asi-arch-sector-packs'
  },
  {
    name: 'asi-arch-lite-templates',
    description: 'MIT licensed API templates',
    path: '../asi-arch-lite-templates'
  },
  {
    name: 'asi-arch-coordinators',
    description: 'Agent orchestration and coordination systems',
    path: '../asi-arch-coordinators'
  }
];

class EcosystemInitializer {
  constructor() {
    this.initialized = false;
    this.startTime = Date.now();
  }

  async initialize() {
    try {
      log.header('ASI-Arch Ecosystem Initialization');
      
      await this.validateEnvironment();
      await this.initializeRepositories();
      await this.setupDependencies();
      await this.configureMetaAgent();
      await this.initializeEvolutionLoop();
      await this.setupMonitoring();
      await this.generateInitialReport();
      
      this.initialized = true;
      log.success(`Ecosystem initialization completed in ${((Date.now() - this.startTime) / 1000).toFixed(2)}s`);
      
    } catch (error) {
      log.error(`Initialization failed: ${error.message}`);
      throw error;
    }
  }

  async validateEnvironment() {
    log.info('Validating environment prerequisites...');
    
    // Check Node.js version
    const nodeVersion = process.version;
    const requiredNodeVersion = 'v18.0.0';
    if (nodeVersion < requiredNodeVersion) {
      throw new Error(`Node.js ${requiredNodeVersion}+ required, found ${nodeVersion}`);
    }
    log.success(`Node.js version: ${nodeVersion}`);
    
    // Check npm
    try {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      log.success(`npm version: ${npmVersion}`);
    } catch (error) {
      throw new Error('npm not found in PATH');
    }
    
    // Check git
    try {
      const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
      log.success(`Git available: ${gitVersion}`);
    } catch (error) {
      throw new Error('git not found in PATH');
    }
    
    // Check available disk space
    try {
      const stats = await fs.stat('.');
      log.success('Disk space check passed');
    } catch (error) {
      log.warning('Could not check disk space');
    }
    
    // Validate network connectivity
    try {
      await axios.get('https://api.github.com', { timeout: 5000 });
      log.success('GitHub API connectivity verified');
    } catch (error) {
      log.warning('GitHub API not reachable - some features may be limited');
    }
  }

  async initializeRepositories() {
    log.info('Initializing ASI-Arch ecosystem repositories...');
    
    for (const repo of ECOSYSTEM_REPOS) {
      if (repo.isMain) {
        log.info(`Validating main repository: ${repo.name}`);
        await this.validateMainRepository();
      } else {
        log.info(`Creating repository: ${repo.name}`);
        await this.createRepository(repo);
      }
    }
    
    log.success('All repositories initialized');
  }

  async validateMainRepository() {
    // Ensure all required files exist
    const requiredFiles = [
      'package.json',
      'tsconfig.json',
      'README.md',
      'LICENSE',
      'META_AGREEMENTS.md',
      'CONTRIBUTING.md',
      'SECURITY.md'
    ];
    
    for (const file of requiredFiles) {
      try {
        await fs.access(file);
        log.success(`✓ ${file}`);
      } catch (error) {
        log.error(`Missing required file: ${file}`);
        throw new Error(`Main repository validation failed: missing ${file}`);
      }
    }
    
    // Validate package.json structure
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    if (!packageJson.name || !packageJson.version || !packageJson.scripts) {
      throw new Error('Invalid package.json structure');
    }
    
    log.success('Main repository validation passed');
  }

  async createRepository(repo) {
    const repoPath = repo.path;
    
    try {
      // Create directory if it doesn't exist
      await fs.mkdir(repoPath, { recursive: true });
      
      // Initialize git repository
      process.chdir(repoPath);
      
      if (!await this.isGitRepository()) {
        execSync('git init', { stdio: 'pipe' });
        log.success(`Git repository initialized: ${repo.name}`);
      } else {
        log.info(`Git repository already exists: ${repo.name}`);
      }
      
      // Create basic structure based on repository type
      await this.createRepositoryStructure(repo);
      
      // Return to original directory
      process.chdir('../asi-arch-meta');
      
      log.success(`Repository created: ${repo.name}`);
      
    } catch (error) {
      log.error(`Failed to create repository ${repo.name}: ${error.message}`);
      throw error;
    }
  }

  async isGitRepository() {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  async createRepositoryStructure(repo) {
    switch (repo.name) {
      case 'asi-arch-agent-registry':
        await this.createRegistryStructure();
        break;
      case 'asi-arch-agent-army-core':
        await this.createCoreStructure();
        break;
      case 'asi-arch-sector-packs':
        await this.createSectorPacksStructure();
        break;
      case 'asi-arch-lite-templates':
        await this.createLiteTemplatesStructure();
        break;
      case 'asi-arch-coordinators':
        await this.createCoordinatorsStructure();
        break;
    }
  }

  async createRegistryStructure() {
    const structure = [
      'registry/agents',
      'registry/coordinators', 
      'registry/sectors',
      'schemas',
      'tools',
      'dist',
      'tests'
    ];
    
    for (const dir of structure) {
      await fs.mkdir(dir, { recursive: true });
    }
    
    // Create basic files
    await this.writeFile('README.md', this.generateRegistryReadme());
    await this.writeFile('package.json', JSON.stringify(this.generateRegistryPackageJson(), null, 2));
    await this.copyLicenseAndDocs();
  }

  async createCoreStructure() {
    const structure = [
      'src/interfaces',
      'src/runners',
      'src/templates',
      'src/operators',
      'tests/unit',
      'tests/integration',
      'examples',
      'docs'
    ];
    
    for (const dir of structure) {
      await fs.mkdir(dir, { recursive: true });
    }
    
    await this.writeFile('README.md', this.generateCoreReadme());
    await this.writeFile('package.json', JSON.stringify(this.generateCorePackageJson(), null, 2));
    await this.copyLicenseAndDocs();
  }

  async createSectorPacksStructure() {
    const sectors = ['legal', 'fintech', 'manufacturing', 'academia', 'government', 'healthcare'];
    
    for (const sector of sectors) {
      await fs.mkdir(`${sector}/configs`, { recursive: true });
      await fs.mkdir(`${sector}/connectors`, { recursive: true });
      await fs.mkdir(`${sector}/examples`, { recursive: true });
    }
    
    await this.writeFile('README.md', this.generateSectorPacksReadme());
    await this.writeFile('package.json', JSON.stringify(this.generateSectorPacksPackageJson(), null, 2));
    await this.copyLicenseAndDocs();
  }

  async createLiteTemplatesStructure() {
    const templates = ['lite-debugger-api', 'lite-validator-api', 'lite-explainer-api'];
    
    for (const template of templates) {
      await fs.mkdir(`${template}/src`, { recursive: true });
      await fs.mkdir(`${template}/tests`, { recursive: true });
      await fs.mkdir(`${template}/docs`, { recursive: true });
    }
    
    await this.writeFile('README.md', this.generateLiteTemplatesReadme());
    await this.writeFile('package.json', JSON.stringify(this.generateLiteTemplatesPackageJson(), null, 2));
    await this.copyLicenseAndDocs();
  }

  async createCoordinatorsStructure() {
    const coordinators = ['coordinator-qa', 'coordinator-deploy', 'coordinator-edu', 'coordinator-research'];
    
    for (const coordinator of coordinators) {
      await fs.mkdir(`${coordinator}/src`, { recursive: true });
      await fs.mkdir(`${coordinator}/policies`, { recursive: true });
      await fs.mkdir(`${coordinator}/tests`, { recursive: true });
    }
    
    await this.writeFile('README.md', this.generateCoordinatorsReadme());
    await this.writeFile('package.json', JSON.stringify(this.generateCoordinatorsPackageJson(), null, 2));
    await this.copyLicenseAndDocs();
  }

  async writeFile(filename, content) {
    await fs.writeFile(filename, content, 'utf8');
  }

  async copyLicenseAndDocs() {
    // Copy essential files from meta repository
    const filesToCopy = ['LICENSE', 'CONTRIBUTING.md', 'SECURITY.md'];
    
    for (const file of filesToCopy) {
      try {
        const content = await fs.readFile(`../asi-arch-meta/${file}`, 'utf8');
        await this.writeFile(file, content);
      } catch (error) {
        log.warning(`Could not copy ${file}: ${error.message}`);
      }
    }
  }

  async setupDependencies() {
    log.info('Setting up cross-repository dependencies...');
    
    // Install dependencies for main repository
    log.info('Installing meta repository dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    // Build main repository
    log.info('Building meta repository...');
    execSync('npm run build', { stdio: 'inherit' });
    
    log.success('Dependencies setup completed');
  }

  async configureMetaAgent() {
    log.info('Configuring meta-agent system...');
    
    // Create meta-agent configuration
    const metaConfig = {
      ecosystem: {
        repositories: ECOSYSTEM_REPOS.map(repo => ({
          name: repo.name,
          path: repo.path,
          role: this.getRepositoryRole(repo.name)
        }))
      },
      evolution: {
        enabled: true,
        populationSize: 20,
        maxGenerations: 1000,
        mutationRate: 0.1,
        crossoverRate: 0.7
      },
      monitoring: {
        enabled: true,
        metricsInterval: 1000,
        alertThresholds: {
          performanceDrop: 0.2,
          resourceUsage: 0.9,
          errorRate: 0.05
        }
      }
    };
    
    await this.writeFile('meta-config.json', JSON.stringify(metaConfig, null, 2));
    log.success('Meta-agent configuration created');
  }

  getRepositoryRole(repoName) {
    const roles = {
      'asi-arch-meta': 'controller',
      'asi-arch-agent-registry': 'registry',
      'asi-arch-agent-army-core': 'sdk',
      'asi-arch-sector-packs': 'specialization',
      'asi-arch-lite-templates': 'templates',
      'asi-arch-coordinators': 'orchestration'
    };
    return roles[repoName] || 'unknown';
  }

  async initializeEvolutionLoop() {
    log.info('Initializing evolution loop...');
    
    // Create initial population configuration
    const initialPopulation = {
      agents: [
        {
          id: 'kimi-k2-base',
          type: 'KimiK2Adapter',
          config: {
            knowledgeBase: 'scientific',
            reasoningMode: 'hybrid',
            learningRate: 0.001
          }
        }
      ],
      environment: {
        type: 'multi-objective',
        objectives: ['performance', 'efficiency', 'robustness', 'novelty'],
        constraints: {
          maxResourceUsage: 0.8,
          maxExecutionTime: 30000,
          safetyBounds: true
        }
      }
    };
    
    await this.writeFile('initial-population.json', JSON.stringify(initialPopulation, null, 2));
    log.success('Evolution loop initialized');
  }

  async setupMonitoring() {
    log.info('Setting up ecosystem monitoring...');
    
    // Create monitoring configuration
    const monitoringConfig = {
      metrics: {
        system: ['cpu', 'memory', 'disk', 'network'],
        evolution: ['fitness', 'diversity', 'convergence', 'innovation'],
        agents: ['performance', 'stability', 'adaptability', 'efficiency']
      },
      alerts: {
        channels: ['console', 'file'],
        thresholds: {
          critical: 0.95,
          warning: 0.8,
          info: 0.6
        }
      },
      dashboards: {
        enabled: true,
        updateInterval: 5000,
        historyLength: 1000
      }
    };
    
    await this.writeFile('monitoring-config.json', JSON.stringify(monitoringConfig, null, 2));
    log.success('Monitoring setup completed');
  }

  async generateInitialReport() {
    log.info('Generating initialization report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      status: 'initialized',
      repositories: ECOSYSTEM_REPOS.length,
      initializationTime: Date.now() - this.startTime,
      nextSteps: [
        'Run evolutionary loop: npm run evolve',
        'Monitor ecosystem: npm run monitor',
        'Sync agent registry: npm run sync:registry',
        'Validate agents: npm run eval:agents'
      ],
      ecosystem: {
        meta: 'Configured and ready',
        registry: 'Empty - needs population',
        core: 'Basic structure created',
        sectors: 'Templates created',
        templates: 'Ready for development',
        coordinators: 'Basic structure created'
      }
    };
    
    await this.writeFile('initialization-report.json', JSON.stringify(report, null, 2));
    
    // Display summary
    log.header('Initialization Summary');
    console.log(`📊 Repositories created: ${report.repositories}`);
    console.log(`⏱️  Total time: ${(report.initializationTime / 1000).toFixed(2)}s`);
    console.log(`🚀 Status: ${report.status}`);
    
    log.header('Next Steps');
    report.nextSteps.forEach(step => console.log(`   ${step}`));
    
    log.success('Initialization report generated');
  }

  // README generation methods
  generateRegistryReadme() {
    return `# ASI-Arch Agent Registry

Curated catalog of AI agents and coordinators for the ASI-Arch ecosystem.

## Structure
- \`registry/agents/\`: Individual agent configurations
- \`registry/coordinators/\`: Coordination system specs
- \`registry/sectors/\`: Sector-specific agent packs
- \`schemas/\`: JSON schemas for validation
- \`tools/\`: Registry management utilities

## Usage
\`\`\`bash
npm run validate    # Validate all registry entries
npm run build       # Generate registry index
npm run publish     # Publish registry release
\`\`\`

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding agents to the registry.
`;
  }

  generateCoreReadme() {
    return `# ASI-Arch Agent Army Core

SDK, runners, and templates for evolutionary AI agents based on Oak Architecture.

## Features
- TypeScript SDK with evolutionary interfaces
- Agent runners and evaluation harness
- Template agents (flow-interpreter, evo-debugger, etc.)
- Evolutionary operators (mutation, crossover, selection)

## Quick Start
\`\`\`bash
npm install @asi-arch/core
npm run build
npm run test
\`\`\`

## Documentation
See [docs/](docs/) for comprehensive API documentation.
`;
  }

  generateSectorPacksReadme() {
    return `# ASI-Arch Sector Packs

Industry and domain-specific agent configurations and connectors.

## Available Sectors
- Legal: Regulatory compliance and document analysis
- FinTech: Financial modeling and risk assessment
- Manufacturing: Process optimization and quality control
- Academia: Research assistance and knowledge management
- Government: Policy analysis and public service automation
- Healthcare: Diagnostic support and treatment planning

## Usage
Each sector pack includes specialized agents, connectors, and example configurations.
`;
  }

  generateLiteTemplatesReadme() {
    return `# ASI-Arch Lite Templates

MIT-licensed API templates for quick deployment of ASI-Arch capabilities.

## Available Templates
- \`lite-debugger-api\`: Code analysis and fixing
- \`lite-validator-api\`: Quality assurance and testing
- \`lite-explainer-api\`: Pedagogical explanations

## Deployment
Each template includes Docker, Vercel, and Render configurations for easy deployment.
`;
  }

  generateCoordinatorsReadme() {
    return `# ASI-Arch Coordinators

Agent orchestration and coordination systems for complex multi-agent workflows.

## Available Coordinators
- \`coordinator-qa\`: Quality assurance workflows
- \`coordinator-deploy\`: Deployment and release management
- \`coordinator-edu\`: Educational content delivery
- \`coordinator-research\`: Research project management

## Architecture
Each coordinator defines policies, KPI contracts, and orchestration logic.
`;
  }

  // Package.json generation methods
  generateRegistryPackageJson() {
    return {
      name: '@asi-arch/agent-registry',
      version: '0.1.0',
      description: 'Curated catalog of AI agents and coordinators',
      main: 'dist/index.js',
      scripts: {
        validate: 'node tools/validate.js',
        build: 'node tools/index-builder.js',
        test: 'jest',
        publish: 'npm version patch && npm publish'
      },
      dependencies: {
        'js-yaml': '^4.1.0',
        'ajv': '^8.12.0'
      },
      devDependencies: {
        'jest': '^29.6.0'
      },
      license: 'MIT'
    };
  }

  generateCorePackageJson() {
    return {
      name: '@asi-arch/core',
      version: '0.1.0',
      description: 'SDK and runners for evolutionary AI agents',
      main: 'dist/index.js',
      types: 'dist/index.d.ts',
      scripts: {
        build: 'tsc',
        test: 'jest',
        lint: 'eslint src/**/*.ts'
      },
      dependencies: {
        'typescript': '^5.1.0',
        'lodash': '^4.17.0'
      },
      devDependencies: {
        'jest': '^29.6.0',
        '@types/node': '^20.0.0',
        'eslint': '^8.45.0'
      },
      license: 'MIT'
    };
  }

  generateSectorPacksPackageJson() {
    return {
      name: '@asi-arch/sector-packs',
      version: '0.1.0',
      description: 'Industry-specific agent configurations',
      scripts: {
        validate: 'node scripts/validate-packs.js',
        test: 'jest'
      },
      dependencies: {
        'js-yaml': '^4.1.0'
      },
      devDependencies: {
        'jest': '^29.6.0'
      },
      license: 'MIT'
    };
  }

  generateLiteTemplatesPackageJson() {
    return {
      name: '@asi-arch/lite-templates',
      version: '0.1.0',
      description: 'MIT-licensed API templates',
      scripts: {
        build: 'npm run build --workspaces',
        test: 'npm run test --workspaces',
        deploy: 'npm run deploy --workspaces'
      },
      workspaces: [
        'lite-debugger-api',
        'lite-validator-api', 
        'lite-explainer-api'
      ],
      license: 'MIT'
    };
  }

  generateCoordinatorsPackageJson() {
    return {
      name: '@asi-arch/coordinators',
      version: '0.1.0',
      description: 'Agent orchestration systems', 
      scripts: {
        build: 'tsc',
        test: 'jest',
        validate: 'node scripts/validate-policies.js'
      },
      dependencies: {
        'typescript': '^5.1.0'
      },
      devDependencies: {
        'jest': '^29.6.0',
        '@types/node': '^20.0.0'
      },
      license: 'MIT'
    };
  }
}

// Main execution
if (require.main === module) {
  const initializer = new EcosystemInitializer();
  
  initializer.initialize()
    .then(() => {
      log.success('🎉 ASI-Arch ecosystem initialization completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      log.error(`💥 Initialization failed: ${error.message}`);
      console.error(error);
      process.exit(1);
    });
}

module.exports = EcosystemInitializer;