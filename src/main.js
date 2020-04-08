import {
  createSiteMenuTemplate
} from "./components/site-menu.js";
import {
  createSortingTemplate
} from "./components/sorting";
import {
  createFilterTemplate
} from "./components/filter.js";
import {
  createTaskTemplate
} from "./components/task.js";
import {
  createTaskEditTemplate
} from "./components/task-edit.js";
import {
  createLoadMoreButtonTemplate
} from "./components/load-more-button.js";
import {
  createBoardTemplate
} from "./components/board.js";
import {
  generateFilters
} from "./mock/filter.js";
import {
  generateTasks
} from "./mock/task.js";


const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, htmlData, place = `beforeend`) => {
  container.insertAdjacentHTML(place, htmlData);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task)));

render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => render(taskListElement, createTaskTemplate(task)));
    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
});
