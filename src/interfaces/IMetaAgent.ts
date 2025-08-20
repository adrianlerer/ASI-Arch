/**
 * Core interfaces for the ASI-Arch Meta-Agent system
 * Based on Rich Sutton's Oak Architecture principles
 */

export interface IState {
  id: string;
  features: Map<string, number>;
  timestamp: Date;
  context: Record<string, any>;
}

export interface IAction {
  type: string;
  parameters: Record<string, any>;
  expectedOutcome?: string;
}

export interface IReward {
  value: number;
  source: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface IOption {
  policy: IPolicy;
  terminationCondition: (state: IState) => boolean;
  name: string;
  description?: string;
}

export interface IPolicy {
  selectAction(state: IState): Promise<IAction>;
  update(state: IState, action: IAction, reward: IReward, nextState: IState): Promise<void>;
}

export interface IValueFunction {
  estimate(state: IState): Promise<number>;
  update(state: IState, target: number): Promise<void>;
}

export interface ITransitionModel {
  predict(state: IState, action: IAction): Promise<IState>;
  learn(state: IState, action: IAction, nextState: IState): Promise<void>;
}

export interface ISubproblem {
  id: string;
  targetFeature: string;
  intensity: number; // κ (kappa) in Sutton's formulation
  rewardFunction: (state: IState, action: IAction, nextState: IState) => IReward;
}

export interface IMetaAgent {
  // Oak Architecture 8-step loop
  learnPoliciesAndValues(): Promise<void>;
  generateNewFeatures(): Promise<string[]>;
  rankFeatures(features: string[]): Promise<Map<string, number>>;
  createSubproblems(rankedFeatures: Map<string, number>): Promise<ISubproblem[]>;
  learnSubproblemSolutions(subproblems: ISubproblem[]): Promise<IOption[]>;
  learnTransitionModels(options: IOption[]): Promise<ITransitionModel[]>;
  plan(models: ITransitionModel[]): Promise<IAction[]>;
  maintainMetadata(): Promise<void>;

  // Core operations
  perceive(observations: any[]): Promise<IState>;
  act(state: IState): Promise<IAction>;
  learn(experience: IExperience): Promise<void>;
  
  // Agent lifecycle
  initialize(config: IAgentConfig): Promise<void>;
  shutdown(): Promise<void>;
}

export interface IExperience {
  state: IState;
  action: IAction;
  reward: IReward;
  nextState: IState;
  done: boolean;
}

export interface IAgentConfig {
  id: string;
  type: string;
  parameters: Record<string, any>;
  capabilities: string[];
  constraints: Record<string, any>;
}

export interface IEvolutionaryOperator {
  mutate(agent: IMetaAgent): Promise<IMetaAgent>;
  crossover(parent1: IMetaAgent, parent2: IMetaAgent): Promise<IMetaAgent>;
  evaluate(agent: IMetaAgent): Promise<number>;
  select(population: IMetaAgent[], count: number): Promise<IMetaAgent[]>;
}

export interface IAgentRegistry {
  register(agent: IAgentConfig): Promise<void>;
  discover(criteria: Record<string, any>): Promise<IAgentConfig[]>;
  validate(agent: IAgentConfig): Promise<boolean>;
  update(agentId: string, config: Partial<IAgentConfig>): Promise<void>;
}

export interface ICoordinator {
  orchestrate(agents: IMetaAgent[]): Promise<void>;
  monitor(agents: IMetaAgent[]): Promise<Record<string, any>>;
  optimize(agents: IMetaAgent[]): Promise<IMetaAgent[]>;
}

export interface IEvaluator {
  robustness(agent: IMetaAgent): Promise<number>;
  reproducibility(agent: IMetaAgent): Promise<number>;
  latency(agent: IMetaAgent): Promise<number>;
  cost(agent: IMetaAgent): Promise<number>;
  overall(agent: IMetaAgent): Promise<number>;
}