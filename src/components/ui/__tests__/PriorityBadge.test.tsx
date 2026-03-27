import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriorityBadge } from '../PriorityBadge';

describe('PriorityBadge', () => {
  it('renders the correct priority text', () => {
    render(<PriorityBadge priority="high" />);
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('applies destructive styles for high priority', () => {
    const { container } = render(<PriorityBadge priority="high" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-destructive/15');
    expect(badge.className).toContain('text-destructive');
  });

  it('applies warning styles for medium priority', () => {
    const { container } = render(<PriorityBadge priority="medium" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-warning/15');
    expect(badge.className).toContain('text-warning');
  });

  it('applies success styles for low priority', () => {
    const { container } = render(<PriorityBadge priority="low" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-success/15');
    expect(badge.className).toContain('text-success');
  });

  it('renders an icon for known priorities', () => {
    const { container } = render(<PriorityBadge priority="high" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('handles empty string gracefully with fallback text', () => {
    render(<PriorityBadge priority="" />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  it('handles unexpected priority values gracefully', () => {
    render(<PriorityBadge priority="critical" />);
    expect(screen.getByText('critical')).toBeInTheDocument();
    // Should render without priority-specific styles
    const { container } = render(<PriorityBadge priority="critical" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).not.toContain('bg-destructive');
    expect(badge.className).not.toContain('bg-warning');
    expect(badge.className).not.toContain('bg-success');
  });

  it('is case-insensitive for priority matching', () => {
    const { container } = render(<PriorityBadge priority="HIGH" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-destructive/15');
  });
});
