import { IState } from '../../types';
import { getCarImage } from '../garage-section/car';

const buildHtmlForTable = (state: IState) => `
  <tbody>
    <tr>
      <th>Number</th>
      <th>Car</th>
      <th>Model</th>
      <th class="table__wins-cell">
        <button class="table__wins 
        ${state.sortBy === 'wins' ? state.sortOrder.toLowerCase() : ''}" type="button">Wins</button>
      </th>
      <th class="table__time-cell">
        <button class="table__time 
        ${state.sortBy === 'time' ? state.sortOrder.toLowerCase() : ''}" type="button">Best time (sec)</button>
      </th>
    </tr>
  ${state.winners
    .map(
      (winner, idx: number) => `
  <tr>
    <td>${idx + 1}</td>
    <td>${getCarImage(winner.car.color)}</td>
    <td>${winner.car.name}</td>
    <td>${winner.wins}</td>
    <td>${winner.time}</td>
  </tr>`
    )
    .join('')}
  </tbody> 
`;

export default buildHtmlForTable;
