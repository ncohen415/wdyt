export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  slug: string
}

export type AuthContext = {
  signin: Function
  signout: Function
  user: User | null
  setUser: Function
  error: boolean
  loggedInVerify: Function
}

export type MultipleChoiceOption = {
  question?: Question
  option: string
  id: number
}

export interface Question {
  title: string
  context: string
  response_type: string
  response_types: Array<string>
  asker: User
  created_at: Date
  allow_explanation: boolean
  confirmed: boolean
  multiple_choice_number_of_options?: number
  multiple_choice_options?: Array<MultipleChoiceOption>
}
