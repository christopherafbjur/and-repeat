export interface MessageResponse {
  status: number,
  message?: string,
  data: {
    id: number,
    title: string,
    text: string
  }[]
}