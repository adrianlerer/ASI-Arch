/**
 * Oak Architecture Evolution Loop Implementation
 * Based on Rich Sutton's 8-step process for continuous agent improvement
 */

import { EventEmitter } from 'events';
import { IMetaAgent, IExperience, IState, IAction, IReward } from '../../src/interfaces/IMetaAgent';

export interface EvolutionConfig {
  populationSize: number;
  generationLimit: number;
  mutationRate: number;
  crossoverRate: number;
  eliteSize: number;
  evaluationTimeout: number;
  convergenceThreshold: number;
  diversityWeight: number;
}

export interface EvolutionMetrics {
  generation: number;
  bestFitness: number;
  averageFitness: number;
  diversity: number;
  convergenceRate: number;
  runtime: number;
}

export class OakEvolutionLoop extends EventEmitter {
  private config: EvolutionConfig;
  private population: IMetaAgent[] = [];
  private generation: number = 0;
  private bestAgent: IMetaAgent | null = null;
  private bestFitness: number = -Infinity;
  private metrics: EvolutionMetrics[] = [];
  private isRunning: boolean = false;

  constructor(config: Partial<EvolutionConfig> = {}) {
    super();
    
    this.config = {
      populationSize: 50,
      generationLimit: 100,
      mutationRate: 0.1,
      crossoverRate: 0.7,
      eliteSize: 5,
      evaluationTimeout: 30000, // 30 seconds
      convergenceThreshold: 0.001,
      diversityWeight: 0.3,
      ...config
    };
  }

  /**
   * Main evolutionary loop implementing Sutton's Oak Architecture
   * Runs continuous cycles of the 8-step process
   */
  async run(initialPopulation: IMetaAgent[]): Promise<IMetaAgent> {
    this.isRunning = true;
    this.population = [...initialPopulation];
    this.generation = 0;

    console.log(`🌱 Starting Oak Evolution Loop with ${this.config.populationSize} agents`);
    this.emit('evolutionStarted', { config: this.config });

    try {
      while (this.isRunning && this.generation < this.config.generationLimit) {
        const startTime = Date.now();
        
        console.log(`\n🧬 Generation ${this.generation + 1}/${this.config.generationLimit}`);
        
        // Execute the 8-step Oak Architecture loop for each agent
        const newGeneration = await this.executeOakCycle();
        
        // Evaluate fitness of new generation
        const fitnessScores = await this.evaluatePopulation(newGeneration);
        
        // Update best agent
        await this.updateBestAgent(newGeneration, fitnessScores);
        
        // Calculate generation metrics
        const generationMetrics = this.calculateMetrics(fitnessScores, Date.now() - startTime);
        this.metrics.push(generationMetrics);
        
        this.emit('generationComplete', generationMetrics);
        
        // Check for convergence
        if (this.hasConverged()) {
          console.log('🎯 Evolution converged!');
          break;
        }
        
        // Prepare next generation
        this.population = await this.selectNextGeneration(newGeneration, fitnessScores);
        this.generation++;
      }

      this.emit('evolutionComplete', {
        bestAgent: this.bestAgent,
        bestFitness: this.bestFitness,
        generations: this.generation,
        metrics: this.metrics
      });

      return this.bestAgent!;

    } catch (error) {
      this.emit('evolutionError', error);
      throw error;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Execute one complete Oak Architecture cycle for all agents
   * Implements Sutton's 8-step process in parallel
   */
  private async executeOakCycle(): Promise<IMetaAgent[]> {
    console.log('🔄 Executing Oak Architecture 8-step cycle...');
    
    const newGeneration: IMetaAgent[] = [];
    
    // Process agents in batches for efficiency
    const batchSize = Math.min(10, this.population.length);
    
    for (let i = 0; i < this.population.length; i += batchSize) {
      const batch = this.population.slice(i, i + batchSize);
      
      const batchResults = await Promise.all(
        batch.map(agent => this.executeAgentOakCycle(agent))
      );
      
      newGeneration.push(...batchResults);
    }
    
    return newGeneration;
  }

  /**
   * Execute Oak Architecture 8-step loop for a single agent
   */
  private async executeAgentOakCycle(agent: IMetaAgent): Promise<IMetaAgent> {
    try {
      // Step 1: Learn policies and value functions maximizing reward
      await agent.learnPoliciesAndValues();
      
      // Step 2: Generate new state features
      const newFeatures = await agent.generateNewFeatures();
      
      // Step 3: Rank the features
      const rankedFeatures = await agent.rankFeatures(newFeatures);
      
      // Step 4: Create subproblems for each highly ranked feature
      const subproblems = await agent.createSubproblems(rankedFeatures);
      
      // Step 5: Learn solutions to the subproblems
      const options = await agent.learnSubproblemSolutions(subproblems);
      
      // Step 6: Learn transition models for the solutions
      const models = await agent.learnTransitionModels(options);
      
      // Step 7: Plan using the models
      const actionPlan = await agent.plan(models);
      
      // Step 8: Maintain metadata about utility
      await agent.maintainMetadata();
      
      // Apply evolutionary operators
      return await this.applyEvolution(agent);
      
    } catch (error) {
      console.error(`Error in agent Oak cycle: ${error}`);
      return agent; // Return original agent if cycle fails
    }
  }

  /**
   * Apply evolutionary operators (mutation, crossover) to an agent
   */
  private async applyEvolution(agent: IMetaAgent): Promise<IMetaAgent> {
    let evolvedAgent = agent;
    
    // Mutation
    if (Math.random() < this.config.mutationRate) {
      evolvedAgent = await this.mutateAgent(evolvedAgent);
    }
    
    // Crossover (requires selecting another parent)
    if (Math.random() < this.config.crossoverRate && this.population.length > 1) {
      const otherParent = this.selectRandomAgent(agent);
      evolvedAgent = await this.crossoverAgents(evolvedAgent, otherParent);
    }
    
    return evolvedAgent;
  }

  /**
   * Mutate an agent by perturbing its internal parameters
   */
  private async mutateAgent(agent: IMetaAgent): Promise<IMetaAgent> {
    // Create a deep copy and apply mutations
    // This is a simplified mutation - real implementation would
    // mutate specific agent parameters, knowledge, or structure
    
    try {
      // Generate random experiences to drive mutation
      const mutationExperiences = await this.generateMutationExperiences();
      
      for (const experience of mutationExperiences) {
        await agent.learn(experience);
      }
      
      return agent;
      
    } catch (error) {
      console.error(`Mutation failed: ${error}`);
      return agent;
    }
  }

  /**
   * Generate random experiences for mutation
   */
  private async generateMutationExperiences(): Promise<IExperience[]> {
    const experiences: IExperience[] = [];
    const numExperiences = Math.floor(Math.random() * 5) + 1;
    
    for (let i = 0; i < numExperiences; i++) {
      const state: IState = {
        id: `mutation_state_${i}`,
        features: new Map([
          ['exploration', Math.random()],
          ['adaptation', Math.random()],
          ['novelty', Math.random()]
        ]),
        timestamp: new Date(),
        context: { source: 'mutation', iteration: i }
      };
      
      const action: IAction = {
        type: 'mutate',
        parameters: {
          intensity: Math.random() * 0.2, // Small mutations
          direction: Math.random() > 0.5 ? 'increase' : 'decrease'
        }
      };
      
      const reward: IReward = {
        value: (Math.random() - 0.5) * 0.1, // Small random reward
        source: 'mutation',
        timestamp: new Date()
      };
      
      const nextState: IState = {
        ...state,
        id: `mutation_next_state_${i}`,
        features: new Map([
          ['exploration', Math.random()],
          ['adaptation', Math.random()],
          ['novelty', Math.random()]
        ])
      };
      
      experiences.push({
        state,
        action,
        reward,
        nextState,
        done: false
      });
    }
    
    return experiences;
  }

  /**
   * Perform crossover between two parent agents
   */
  private async crossoverAgents(parent1: IMetaAgent, parent2: IMetaAgent): Promise<IMetaAgent> {
    // Simplified crossover - in reality, this would combine
    // knowledge, policies, or structural components from both parents
    
    try {
      // For now, randomly select one parent and apply some mixing
      const selectedParent = Math.random() > 0.5 ? parent1 : parent2;
      const otherParent = selectedParent === parent1 ? parent2 : parent1;
      
      // Generate crossover experiences
      const crossoverExperiences = await this.generateCrossoverExperiences();
      
      for (const experience of crossoverExperiences) {
        await selectedParent.learn(experience);
      }
      
      return selectedParent;
      
    } catch (error) {
      console.error(`Crossover failed: ${error}`);
      return parent1;
    }
  }

  /**
   * Generate experiences that simulate knowledge transfer between agents
   */
  private async generateCrossoverExperiences(): Promise<IExperience[]> {
    const experiences: IExperience[] = [];
    const numExperiences = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numExperiences; i++) {
      const state: IState = {
        id: `crossover_state_${i}`,
        features: new Map([
          ['knowledge_transfer', Math.random()],
          ['policy_blend', Math.random()],
          ['hybrid_capability', Math.random()]
        ]),
        timestamp: new Date(),
        context: { source: 'crossover', iteration: i }
      };
      
      const action: IAction = {
        type: 'integrate_knowledge',
        parameters: {
          transfer_rate: Math.random() * 0.5 + 0.25, // 25-75% transfer
          integration_mode: Math.random() > 0.5 ? 'additive' : 'selective'
        }
      };
      
      const reward: IReward = {
        value: Math.random() * 0.3, // Positive reward for knowledge integration
        source: 'crossover',
        timestamp: new Date()
      };
      
      const nextState: IState = {
        ...state,
        id: `crossover_next_state_${i}`,
        features: new Map([
          ['knowledge_transfer', Math.random() * 0.5 + 0.5], // Boosted by transfer
          ['policy_blend', Math.random()],
          ['hybrid_capability', Math.random() * 0.3 + 0.7] // Enhanced capability
        ])
      };
      
      experiences.push({
        state,
        action,
        reward,
        nextState,
        done: false
      });
    }
    
    return experiences;
  }

  /**
   * Select a random agent from population (excluding the given agent)
   */
  private selectRandomAgent(excludeAgent: IMetaAgent): IMetaAgent {
    const candidates = this.population.filter(agent => agent !== excludeAgent);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /**
   * Evaluate fitness of entire population
   */
  private async evaluatePopulation(population: IMetaAgent[]): Promise<number[]> {
    console.log('📊 Evaluating population fitness...');
    
    const fitnessPromises = population.map(agent => this.evaluateAgent(agent));
    const fitnessScores = await Promise.all(fitnessPromises);
    
    console.log(`Fitness range: ${Math.min(...fitnessScores).toFixed(3)} - ${Math.max(...fitnessScores).toFixed(3)}`);
    
    return fitnessScores;
  }

  /**
   * Evaluate fitness of a single agent
   */
  private async evaluateAgent(agent: IMetaAgent): Promise<number> {
    try {
      // Create evaluation environment
      const evaluationSteps = 10;
      let totalReward = 0;
      let currentState = await this.generateRandomState();
      
      for (let step = 0; step < evaluationSteps; step++) {
        // Agent acts in environment
        const action = await Promise.race([
          agent.act(currentState),
          new Promise<IAction>((_, reject) => 
            setTimeout(() => reject(new Error('Evaluation timeout')), this.config.evaluationTimeout)
          )
        ]);
        
        // Simulate environment response
        const { nextState, reward } = await this.simulateEnvironmentStep(currentState, action);
        
        totalReward += reward.value;
        
        // Agent learns from experience
        await agent.learn({
          state: currentState,
          action,
          reward,
          nextState,
          done: step === evaluationSteps - 1
        });
        
        currentState = nextState;
      }
      
      // Calculate fitness based on performance and other factors
      const baseFitness = totalReward / evaluationSteps;
      const complexityBonus = this.calculateComplexityBonus(agent);
      const diversityBonus = this.calculateDiversityBonus(agent);
      
      return baseFitness + complexityBonus + diversityBonus;
      
    } catch (error) {
      console.error(`Agent evaluation failed: ${error}`);
      return -1; // Penalty for failed evaluation
    }
  }

  /**
   * Generate a random state for evaluation
   */
  private async generateRandomState(): Promise<IState> {
    return {
      id: `eval_state_${Date.now()}_${Math.random()}`,
      features: new Map([
        ['challenge_level', Math.random()],
        ['complexity', Math.random()],
        ['noise_level', Math.random() * 0.3],
        ['resource_availability', Math.random()],
        ['time_pressure', Math.random()]
      ]),
      timestamp: new Date(),
      context: {
        environment: 'evaluation',
        difficulty: Math.random()
      }
    };
  }

  /**
   * Simulate environment response to agent action
   */
  private async simulateEnvironmentStep(
    state: IState, 
    action: IAction
  ): Promise<{ nextState: IState; reward: IReward }> {
    
    // Simple environment simulation
    const baseReward = Math.random() * 2 - 1; // -1 to 1
    
    // Reward based on action quality
    const actionQuality = this.assessActionQuality(state, action);
    const environmentReward = baseReward * actionQuality;
    
    // Generate next state
    const nextState: IState = {
      id: `next_${state.id}`,
      features: new Map([
        ['challenge_level', Math.max(0, state.features.get('challenge_level')! + (Math.random() - 0.5) * 0.2)],
        ['complexity', Math.max(0, state.features.get('complexity')! + (Math.random() - 0.5) * 0.1)],
        ['noise_level', Math.max(0, Math.min(1, state.features.get('noise_level')! + (Math.random() - 0.5) * 0.1))],
        ['resource_availability', Math.max(0, Math.min(1, state.features.get('resource_availability')! + (Math.random() - 0.5) * 0.15))],
        ['time_pressure', Math.max(0, Math.min(1, state.features.get('time_pressure')! + (Math.random() - 0.5) * 0.1))]
      ]),
      timestamp: new Date(),
      context: {
        ...state.context,
        previous_action: action.type
      }
    };
    
    const reward: IReward = {
      value: environmentReward,
      source: 'environment',
      timestamp: new Date(),
      metadata: {
        action_quality: actionQuality,
        base_reward: baseReward
      }
    };
    
    return { nextState, reward };
  }

  /**
   * Assess the quality of an agent's action in a given state
   */
  private assessActionQuality(state: IState, action: IAction): number {
    // Simple heuristic for action quality
    let quality = 0.5; // Base quality
    
    // Reward complex actions in complex states
    const stateComplexity = state.features.get('complexity') || 0.5;
    const actionComplexity = Object.keys(action.parameters).length * 0.1;
    
    if (stateComplexity > 0.7 && actionComplexity > 0.3) {
      quality += 0.3;
    }
    
    // Penalize overly complex actions in simple states
    if (stateComplexity < 0.3 && actionComplexity > 0.5) {
      quality -= 0.2;
    }
    
    // Reward adaptive actions
    if (action.type.includes('adapt') || action.type.includes('learn')) {
      quality += 0.2;
    }
    
    return Math.max(0.1, Math.min(1.0, quality));
  }

  /**
   * Calculate complexity bonus for agent fitness
   */
  private calculateComplexityBonus(agent: IMetaAgent): number {
    // Simplified complexity assessment
    // In reality, would analyze agent's internal structure, knowledge, etc.
    return Math.random() * 0.1; // Small bonus for now
  }

  /**
   * Calculate diversity bonus to maintain population diversity
   */
  private calculateDiversityBonus(agent: IMetaAgent): number {
    // Simplified diversity assessment
    // In reality, would compare agent's behavior/structure to population
    return Math.random() * 0.05 * this.config.diversityWeight;
  }

  /**
   * Update the best agent if a better one is found
   */
  private async updateBestAgent(population: IMetaAgent[], fitnessScores: number[]): Promise<void> {
    const maxFitness = Math.max(...fitnessScores);
    
    if (maxFitness > this.bestFitness) {
      const bestIndex = fitnessScores.indexOf(maxFitness);
      this.bestAgent = population[bestIndex];
      this.bestFitness = maxFitness;
      
      console.log(`🏆 New best agent found! Fitness: ${maxFitness.toFixed(4)}`);
      this.emit('newBestAgent', {
        agent: this.bestAgent,
        fitness: this.bestFitness,
        generation: this.generation
      });
    }
  }

  /**
   * Calculate metrics for the current generation
   */
  private calculateMetrics(fitnessScores: number[], runtime: number): EvolutionMetrics {
    const bestFitness = Math.max(...fitnessScores);
    const averageFitness = fitnessScores.reduce((sum, score) => sum + score, 0) / fitnessScores.length;
    const diversity = this.calculatePopulationDiversity(fitnessScores);
    const convergenceRate = this.calculateConvergenceRate();
    
    return {
      generation: this.generation,
      bestFitness,
      averageFitness,
      diversity,
      convergenceRate,
      runtime
    };
  }

  /**
   * Calculate population diversity
   */
  private calculatePopulationDiversity(fitnessScores: number[]): number {
    const mean = fitnessScores.reduce((sum, score) => sum + score, 0) / fitnessScores.length;
    const variance = fitnessScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / fitnessScores.length;
    return Math.sqrt(variance);
  }

  /**
   * Calculate convergence rate
   */
  private calculateConvergenceRate(): number {
    if (this.metrics.length < 2) return 0;
    
    const current = this.metrics[this.metrics.length - 1];
    const previous = this.metrics[this.metrics.length - 2];
    
    return Math.abs(current.bestFitness - previous.bestFitness);
  }

  /**
   * Check if evolution has converged
   */
  private hasConverged(): boolean {
    if (this.metrics.length < 5) return false;
    
    const recentMetrics = this.metrics.slice(-5);
    const convergenceRates = recentMetrics.map(m => m.convergenceRate);
    const avgConvergenceRate = convergenceRates.reduce((sum, rate) => sum + rate, 0) / convergenceRates.length;
    
    return avgConvergenceRate < this.config.convergenceThreshold;
  }

  /**
   * Select agents for the next generation
   */
  private async selectNextGeneration(population: IMetaAgent[], fitnessScores: number[]): Promise<IMetaAgent[]> {
    const nextGeneration: IMetaAgent[] = [];
    
    // Elite selection - keep best agents
    const sortedIndices = fitnessScores
      .map((fitness, index) => ({ fitness, index }))
      .sort((a, b) => b.fitness - a.fitness)
      .map(item => item.index);
    
    // Add elite agents
    for (let i = 0; i < Math.min(this.config.eliteSize, sortedIndices.length); i++) {
      nextGeneration.push(population[sortedIndices[i]]);
    }
    
    // Tournament selection for remaining spots
    while (nextGeneration.length < this.config.populationSize) {
      const selected = await this.tournamentSelection(population, fitnessScores);
      nextGeneration.push(selected);
    }
    
    return nextGeneration;
  }

  /**
   * Tournament selection
   */
  private async tournamentSelection(population: IMetaAgent[], fitnessScores: number[]): Promise<IMetaAgent> {
    const tournamentSize = Math.max(2, Math.floor(population.length * 0.1));
    const tournament: { agent: IMetaAgent; fitness: number }[] = [];
    
    // Select random agents for tournament
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      tournament.push({
        agent: population[randomIndex],
        fitness: fitnessScores[randomIndex]
      });
    }
    
    // Return best agent from tournament
    tournament.sort((a, b) => b.fitness - a.fitness);
    return tournament[0].agent;
  }

  /**
   * Stop the evolution loop
   */
  stop(): void {
    this.isRunning = false;
    console.log('🛑 Evolution loop stopped');
  }

  /**
   * Get current evolution statistics
   */
  getStats(): {
    generation: number;
    bestFitness: number;
    metrics: EvolutionMetrics[];
    isRunning: boolean;
  } {
    return {
      generation: this.generation,
      bestFitness: this.bestFitness,
      metrics: this.metrics,
      isRunning: this.isRunning
    };
  }
}