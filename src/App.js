import { useState } from 'react';
import Section from './components/Section';
import Container from './components/Container';
import Statistics from './components/Statistics';
import Notification from './components/Notification';
import FeedbackOptions from './components/FeedbackOptions';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countFeedback = e => {
    const buttonName = e.currentTarget.name;

    if (buttonName === 'good') {
      setGood(prevState => prevState + 1);
      return;
    }

    if (buttonName === 'neutral') {
      setNeutral(prevState => prevState + 1);
      return;
    }

    if (buttonName === 'bad') {
      setBad(prevState => prevState + 1);
      return;
    }
    return;

    // === вариант switch-case ===

    // switch (buttonName) {
    //   case 'good':
    //     setGood(prevState => prevState + 1);
    //     break;
    //   case 'neutral':
    //     setNeutral(prevState => prevState + 1);
    //     break;
    //   case 'bad':
    //     setBad(prevState => prevState + 1);
    //     break;
    //   default:
    //     return;
    // }
  };

  const getPositiveFeedback = () => {
    const total = (good * 100) / (neutral + bad + good);
    return Math.round(total);
  };

  const options = ['good', 'neutral', 'bad'];

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={countFeedback} />
      </Section>
      <Section title="Statistics">
        {good + neutral + bad === 0 ? (
          <Notification message="No feedback given" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={good + neutral + bad}
            positivePercentage={getPositiveFeedback()}
          />
        )}
      </Section>
    </Container>
  );
}
