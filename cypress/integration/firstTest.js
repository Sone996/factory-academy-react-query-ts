// npm run scypress

describe("login", () => {
  it("usec can login", () => {
    // load app
    cy.visit("/login");

    // login
    cy.get("[data-test=loginEmail]").type("jason.statham@gmail.com");
    cy.get("[data-test=loginPassword]").type("mightyme");
    cy.findByRole("button", { name: /login/i }).click();

    // go to create course
    cy.findByText(/new course/i).click();
    cy.findByPlaceholderText(/Name/i).type("cypress");
    cy.findByPlaceholderText(/Price/i).type("3000");
    cy.findByPlaceholderText(/Description/i).type("test test");
    cy.findByText(/create/i).click();

    // go to home page
    cy.findByText(/home/i).click();

    // go to that course

    // delete course
  });
});
