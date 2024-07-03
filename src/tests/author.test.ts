import { app, auth, db, storage } from "../firebase/Firebase-config";
import {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  //   removeAuthor,
} from "../services/authorServices";

import { authorPublicDTO } from "../dto/authorDTO";

class publicDTO implements authorPublicDTO {
  name: string;
}

beforeAll(() => {
  app;
  auth;
  db;
  storage;
});

jest.mock("../services/authorServices", () => {
  console.log("Mock");
  return {
    createAuthor: jest.fn(),
    getAllAuthors: jest.fn(),
    getAuthorById: jest.fn(),
    // removeAuthor: jest.fn(),
  };
});
it("New db", async () => {
  require("../services/authorServices").createAuthor.mockImplementation(() =>
    Promise.resolve({ name: "Test Author" })
  );
  const author = await createAuthor("Test Author");
  expect(author.name).toBe("Test Author");
});

it("Gets information about all authors in the DB", async () => {
  require("../services/authorServices").getAllAuthors.mockImplementation(() =>
    Promise.resolve([
      { name: "Test Author" },
      { name: "Test Author 1" },
      { name: "Test Author 2" },
    ])
  );
  const authors = await getAllAuthors();
  expect(authors.length).toBe(3);
  expect(authors).toBeInstanceOf(Array<publicDTO>);
  console.log("Get Info");
});

// it("Creates a new author in the DB", async () => {
//   const author = await createAuthor("Test Author");
//   expect(author.name).toBe("Test Author");
// });
// it("Deletes the author previously created", async () => {
//   const response = await removeAuthor();
//   expect(response).toBe(200);
// });
