const root = () => cy.get("#root");

const expectedSelectedIds = [
  "0",
  "1",
  "2",
  "5",
  "8",
  "9",
  "10",
  "13",
  "14",
  "16",
  "17",
  "18",
  "19",
];

describe("select item by click or dragging", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("select multiple items by multi-dragging", () => {
    root()
      .trigger("pointerdown", { x: 0, y: 0 })
      .trigger("pointermove", { x: 500, y: 500 })
      .trigger("pointerup");

    root()
      .trigger("pointerdown", { x: 400, y: 400 })
      .trigger("pointermove", { x: 800, y: 600 })
      .trigger("pointerup");

    cy.get(".selectable.selected")
      .should("have.length", 13)
      .then((els) => {
        const selectedIds = els.get().map((el) => el.dataset.id);
        const uniqueIds = [...new Set(selectedIds)];

        expect(selectedIds).to.deep.equal(uniqueIds);
        expect(selectedIds).to.include.members(expectedSelectedIds);
      });
  });

  it("toggle selection when clicking the same item", () => {
    root().trigger("pointerdown", { x: 400, y: 400 }).trigger("pointerup");

    cy.get(".selectable.selected").should("have.length", 1).and("have.attr", "data-id", "7");

    root().trigger("pointerdown", { x: 400, y: 400 }).trigger("pointerup");

    cy.get(".selectable.selected").should("have.length", 0);
  });
});
