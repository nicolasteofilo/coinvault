/* eslint-disable @typescript-eslint/no-explicit-any */

type CallbackFunction = () => Promise<any> | any
type SuccessCallback = (result: any) => void
type ErrorCallback = (error: any) => void

export async function safeExecuteFunction(
  fn: CallbackFunction,
  onSuccess: SuccessCallback,
  onError: ErrorCallback
) {
  try {
    const result = await fn()
    onSuccess(result)
  } catch (error) {
    onError(error)
  }
}
