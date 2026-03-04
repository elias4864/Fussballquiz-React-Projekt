import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from "../../App";
import GlobalNavigation from '../components/GlobalNavigation';
// Falls du Mocking nutzt:
vi.mock("./components/GlobalNavigation", () => ({
  default: () => <div data-testid="mock-nav">NavigationRenderedXYZ</div>
}));

describe("Routing Test", () => {
  it("sollte die Navigation auf der Startseite anzeigen", () => {
    render(
  <MemoryRouter>


  </MemoryRouter>
);




})});