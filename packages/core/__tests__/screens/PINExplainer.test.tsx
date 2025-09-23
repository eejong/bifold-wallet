import { fireEvent, render, screen } from '@testing-library/react-native'
import React from 'react'
import { act } from 'react-test-renderer'

import PINExplainer from '../../src/screens/PINExplainer'
import { testIdWithKey } from '../../src/utils/testable'

describe('PINExplainer Screen', () => {
  test('Button exists and calls the correct function', async () => {
    // Mock function to check if it's called
    const onCreateWallet = jest.fn()

    await act(async () => {
      render(<PINExplainer onCreateWallet={onCreateWallet} />)
    })

    // Find the button by its test ID
    const continueButton = screen.getByTestId(testIdWithKey('ContinueCreatePIN'))
    
    // Check if the button exists
    expect(continueButton).not.toBeNull()
    
    // Simulate a press event on the button
    fireEvent.press(continueButton)

    // Assert that the mock function was called
    expect(onCreateWallet).toHaveBeenCalledTimes(1)
  })
})