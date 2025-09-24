import { render, screen, fireEvent } from '@testing-library/react-native'
import React from 'react'
import { act } from 'react-test-renderer'
import { AuthContext } from '../../src/contexts/auth'
import { StoreProvider, defaultState } from '../../src/contexts/store'
import PINCreate from '../../src/screens/PINCreate'
import { testIdWithKey } from '../../src/utils/testable'
import authContext from '../contexts/auth'
import { ContainerProvider } from '../../src/container-api'
import { MainContainer } from '../../src/container-impl'
import { container } from 'tsyringe'
import { Screens } from '../../src/types/navigators'
describe('PINCreate Screen', () => {
  // A mock navigation object is needed for the component
  const mockNavigation = {
    navigate: jest.fn(),
  };


const mockRoute = {
  key: 'CreatePIN-mock',
  name: Screens.CreatePIN,
  params: {
    flow: 'onboarding'
  },
}
render(<PINCreate route={mockRoute as any} navigation={mockNavigation as any} setAuthenticated={jest.fn()} explainedStatus={false} />)


  test('PIN create renders correctly when explainedStatus is true', async () => {
    const main = new MainContainer(container.createChildContainer()).init()
    const setAuthenticated = jest.fn();

    await act(async () => {
      render(
        <ContainerProvider value={main}>
          <StoreProvider initialState={{ ...defaultState }}>
            <AuthContext.Provider value={authContext}>
              <PINCreate
                route={{ key: 'CreatePIN-key',
                name: Screens.CreatePIN,
                params: { flow: 'onboarding' },
                }}
                navigation={mockNavigation as any}
                setAuthenticated={setAuthenticated}
                explainedStatus={true}
              />
            </AuthContext.Provider>
          </StoreProvider>
        </ContainerProvider>
      );
    });

    const continueButton = screen.queryByTestId(testIdWithKey('ContinueCreatePIN'));
    expect(continueButton).toBeNull();

    const pinInput1 = screen.getByTestId(testIdWithKey('EnterPIN'));
    const pinInput2 = screen.getByTestId(testIdWithKey('ReenterPIN'));
    expect(pinInput1).not.toBeNull();
    expect(pinInput2).not.toBeNull();
  });

  test('PIN Explainer pops up correctly when explainedStatus is false', async () => {
    const main = new MainContainer(container.createChildContainer()).init()
    const setAuthenticated = jest.fn();

    await act(async () => {
      render(
        <ContainerProvider value={main}>
          <StoreProvider initialState={{ ...defaultState }}>
            <AuthContext.Provider value={authContext}>
              <PINCreate
                route={{ key: 'CreatePIN-key',
                name: Screens.CreatePIN,
                params: { flow: 'onboarding' }, 
                }}
                navigation={mockNavigation as any}
                setAuthenticated={setAuthenticated}
                explainedStatus={false}
              />
            </AuthContext.Provider>
          </StoreProvider>
        </ContainerProvider>
      );
    });

    const continueButton = screen.getByTestId(testIdWithKey('ContinueCreatePIN'));
    expect(continueButton).not.toBeNull();

    const pinInput1 = screen.queryByTestId(testIdWithKey('EnterPIN'));
    const pinInput2 = screen.queryByTestId(testIdWithKey('ReenterPIN'));
    expect(pinInput1).toBeNull();
    expect(pinInput2).toBeNull();
  });

  test('Tapping continue on PIN Explainer shows the PIN creation view', async () => {
    const main = new MainContainer(container.createChildContainer()).init()
    const setAuthenticated = jest.fn();

    await act(async () => {
      render(
        <ContainerProvider value={main}>
          <StoreProvider initialState={{ ...defaultState }}>
            <AuthContext.Provider value={authContext}>
              <PINCreate
                route={{ key: 'CreatePIN-key',
                name: Screens.CreatePIN,
                params: { flow: 'onboarding' }, 
                }}
                navigation={mockNavigation as any}
                setAuthenticated={setAuthenticated}
                explainedStatus={false}
              />
            </AuthContext.Provider>
          </StoreProvider>
        </ContainerProvider>
      );
    });

    // Check that the explainer is initially visible
    const continueButton = screen.getByTestId(testIdWithKey('ContinueCreatePIN'));
    expect(continueButton).not.toBeNull();
    
    // Simulate user tapping the button
    await act(async () => {
      fireEvent.press(continueButton);
    });

    // Now, verify that the PIN creation view is rendered
    const pinInput1 = screen.getByTestId(testIdWithKey('EnterPIN'));
    expect(pinInput1).not.toBeNull();
  });
});