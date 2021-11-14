import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { useStudents } from '../../../src/hooks/useStudents';

import { Dashboard } from '../../../src/views/Dashboard';
jest.useFakeTimers()
const mockedUseProduct = useStudents as jest.Mock<any>; 

// Mock the module
jest.mock("../../../src/hooks/useStudents");

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: true }));
  })
  afterEach(() => {
		jest.clearAllMocks();
	});
  it("Renders without crashing", () => {
    const queryClient = new QueryClient();
    const dummyComponentProps = {
      productId: 1
    };
		const componentRenderer = renderer.create(<QueryClientProvider client={queryClient}>
      <Dashboard {...dummyComponentProps} />
      </QueryClientProvider>);
    const tree = componentRenderer.toJSON();

    // then
    expect(tree).toMatchSnapshot();
	});
  it("Displays loading indicator", () => {
		const { getByText } = render(<Dashboard />);
		expect(getByText(/show loading/i)).toBeTruthy();
	});

	it("Displays error message", () => {
    const error = true;
    expect(error).toBe(true);
    // TODO CHECK ERROR
	});
  it("Displays data", () => {
		const mockedProductData = [{
      "id": "sktwi1cgkkuif36f3",
      "name": "Callie Christiansen",
      "age": 27,
      "mark": 6.8,
      "gender": "male",
      "createdAt": 1633700485643,
      "updatedAt": 1636888141276,
      "city": "hcm"
    }];
		mockedUseProduct.mockImplementation(() => ({ isLoading: false, data: mockedProductData }));

		const { queryByText } = render(<Dashboard />);

		expect(queryByText(/show loading/i)).toBeFalsy();
    // TODO CHECK DATA
	});
});



// describe('Dashboard component', () => {
//   test('should render component properly', () => {
//     // given
//     const queryClient = new QueryClient();
//     const dummyComponentProps = {
//       productId: 1
//     };

//     // when
//     const componentRenderer = renderer.create(
//     <QueryClientProvider client={queryClient}>
//       <Dashboard {...dummyComponentProps} />
//       </QueryClientProvider>
//     );
//     // jest.mock('react-query', () => ({ useQuery: () => ({ isLoading: false, error: {}, data: [], }), }));ss
//     const tree = componentRenderer.toJSON();

//     // then
//     expect(tree).toMatchSnapshot();
//   });
// });