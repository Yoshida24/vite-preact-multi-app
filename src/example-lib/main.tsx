import { render } from 'preact'
import './main.css'

interface ExampleLibComponentProps {
  message: string;
}

const ExampleLibComponent: preact.FunctionComponent<ExampleLibComponentProps> = ({ message }: ExampleLibComponentProps) => {
  return (
    <div class="example-lib-container">
      <div class="example-lib-rectangle">
        <div class="example-lib-notification-text">
          <i class="material-icons">info</i>
          <span>&nbsp;&nbsp;{message}</span>
        </div>
      </div>
    </div>
  )
}

export const ExampleLib = {
  render: (targetElement: HTMLElement, props: ExampleLibComponentProps) => render(<ExampleLibComponent {...props} />, targetElement)
};