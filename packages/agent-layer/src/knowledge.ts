/**
 * Represents a structured domain entity exposed to AI agents.
 */
export interface AgentEntity {
  /** Unique identifier for the entity (e.g. URI or UUID). */
  id: string;
  /** Type / classification of the entity (e.g. 'Animal', 'Provider', 'Journey'). */
  type: string;
  /** Human-readable label or title. */
  name?: string;
  /** Key-value attributes describing the entity. */
  attributes: Record<string, unknown>;
  /** Optional provenance or source information. */
  provenance?: {
    sourceUrl?: string;
    updatedAt?: string;
    confidence?: number;
  };
}

/**
 * Explicit relation connecting two entities.
 */
export interface EntityRelation {
  /** The source entity ID or entity reference. */
  subjectId: string;
  /** The relationship verb/predicate (e.g. 'provides_service', 'applies_to', 'requires'). */
  predicate: string;
  /** The target entity ID or value reference. */
  objectId: string;
  /** Optional relation metadata or constraints. */
  metadata?: Record<string, unknown>;
}

/**
 * Constraint or rule governing an entity or action.
 */
export interface KnowledgeConstraint {
  id: string;
  targetType: string;
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';
  value: unknown;
  description?: string;
}

/**
 * Container for a domain knowledge graph exposed to AI agents.
 */
export class KnowledgeGraph {
  private entities: Map<string, AgentEntity> = new Map();
  private relations: EntityRelation[] = [];
  private constraints: KnowledgeConstraint[] = [];

  constructor(public readonly domainName?: string) {}

  /** Add or update an entity in the knowledge graph. */
  addEntity(entity: AgentEntity): this {
    this.entities.set(entity.id, entity);
    return this;
  }

  /** Retrieve an entity by ID. */
  getEntity(id: string): AgentEntity | undefined {
    return this.entities.get(id);
  }

  /** Find all entities of a given type. */
  getEntitiesByType(type: string): AgentEntity[] {
    return Array.from(this.entities.values()).filter((e) => e.type === type);
  }

  /** Add a relationship between entities. */
  addRelation(relation: EntityRelation): this {
    this.relations.push(relation);
    return this;
  }

  /** Get relations matching subject or object ID. */
  getRelationsForEntity(entityId: string): EntityRelation[] {
    return this.relations.filter(
      (r) => r.subjectId === entityId || r.objectId === entityId
    );
  }

  /** Add a constraint. */
  addConstraint(constraint: KnowledgeConstraint): this {
    this.constraints.push(constraint);
    return this;
  }

  /** Get constraints for a specific target type. */
  getConstraintsForType(targetType: string): KnowledgeConstraint[] {
    return this.constraints.filter((c) => c.targetType === targetType);
  }

  /** Export graph state as plain object for serialization / JSON responses. */
  toJSON() {
    return {
      domainName: this.domainName,
      entities: Array.from(this.entities.values()),
      relations: [...this.relations],
      constraints: [...this.constraints],
    };
  }
}
