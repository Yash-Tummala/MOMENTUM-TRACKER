import { describe, expect, it } from 'vitest';
import { deleteHabit } from './habits.js';

describe('deleteHabit', () => {
  it('removes the selected habit without affecting others', () => {
    const habits = [
      { id: 'a', name: 'Morning run', completedDates: [] },
      { id: 'b', name: 'Read 20 pages', completedDates: [] },
    ];

    const result = deleteHabit(habits, 'a');

    expect(result).toEqual([
      { id: 'b', name: 'Read 20 pages', completedDates: [] },
    ]);
  });
});
