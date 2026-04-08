import type { Project } from '../../types';

// =============================================================================
// STATE
// =============================================================================

export interface ProjectsFilterState {
  selectedTags: string[];
}

export const initialState: ProjectsFilterState = {
  selectedTags: [],
};

// =============================================================================
// ACTIONS
// TS note: This is a discriminated union — each branch has a unique 'type'
// literal. TypeScript can narrow the type of 'action' inside a switch/case,
// so action.payload is only available on actions that declare it.
// =============================================================================

export type ProjectsAction =
  | { type: 'TOGGLE_TAG'; payload: string }
  | { type: 'CLEAR_FILTERS' };

// =============================================================================
// REDUCER
// TS note: A reducer must be a pure function — given the same state + action,
// it always returns the same new state. No side effects, no mutations.
// =============================================================================

export function projectsReducer(
  state: ProjectsFilterState,
  action: ProjectsAction,
): ProjectsFilterState {
  switch (action.type) {
    case 'TOGGLE_TAG': {
      const already = state.selectedTags.includes(action.payload);
      return {
        ...state,
        selectedTags: already
          ? state.selectedTags.filter((t) => t !== action.payload)
          : [...state.selectedTags, action.payload],
      };
    }
    case 'CLEAR_FILTERS':
      return initialState;

    default:
      return state;
  }
}

// =============================================================================
// DERIVED DATA HELPER
// Kept outside the reducer (pure function, no hooks) so it can be called
// inline in the component without extra state.
// =============================================================================

export function getFilteredProjects(
  projects: Project[],
  state: ProjectsFilterState,
): Project[] {
  if (state.selectedTags.length === 0) return projects;
  return projects.filter((p) =>
    state.selectedTags.every((tag) => p.tags.includes(tag)),
  );
}

/** Extract every unique tag from the projects array, sorted alphabetically. */
export function getUniqueTags(projects: Project[]): string[] {
  return [...new Set(projects.flatMap((p) => p.tags))].sort();
}
