import { render } from '@testing-library/react';
import JobCard from './JobCard';

// mock react-router-dom named exports for this component
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: function () {
    return {
      applyToJob: function () {
        return null
      },
      applications: new Set()
    }
  }
})
);

describe('Smoke and snapshot CompanyCard test', () => {
  it('should render without crashing', () => {
    render(<JobCard job={{
      title: 'test',
      companyName: 'test',
      salary: '50000',
      equity: '.03'
    }} />
    );
  });
  it('should match snapshot', async () => {
    const { asFragment, findByText } = render(
    <JobCard job={{
      title: 'test',
      companyName: 'test',
      salary: '50000',
      equity: '.03'
    }}/>);
    expect(asFragment()).toMatchSnapshot();
    expect(await findByText('Submit Application!')).toBeInTheDocument();
  })
})
