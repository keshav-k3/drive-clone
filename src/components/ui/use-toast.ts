import * as React from "react"
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "~/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type State = {
  toasts: ToasterToast[]
}

export function useToast() {
  const [state, setState] = React.useState<State>({ toasts: [] })

  const toast = React.useCallback(
    ({ ...props }: Omit<ToasterToast, "id">) => {
      const id = genId()

      setState((state) => {
        const newToasts = [
          { id, ...props },
          ...state.toasts,
        ].slice(0, TOAST_LIMIT)

        return {
          ...state,
          toasts: newToasts,
        }
      })
    },
    []
  )

  const dismiss = React.useCallback((toastId?: string) => {
    setState((state) => ({
      ...state,
      toasts: state.toasts.filter((t) => t.id !== toastId),
    }))
  }, [])

  return {
    toast,
    dismiss,
    toasts: state.toasts,
  }
}