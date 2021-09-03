import React, { Component } from 'react';
import Section from './components/Section';
import Container from './components/Container';
import Statistics from './components/Statistics';
import Notification from './components/Notification';
import FeedbackOptions from './components/FeedbackOptions';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countFeedback = e => {
    const buttonName = e.currentTarget.name;

    this.setState(prevState => ({
      [buttonName]: prevState[buttonName] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;

    return good + neutral + bad;
  };

  getPositiveFeedback = () => {
    const { good, neutral, bad } = this.state;

    const total = (good * 100) / (neutral + bad + good);
    return Math.round(total);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const calckOfPositiveFeedback = this.getPositiveFeedback();
    const total = this.countTotalFeedback();

    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.countFeedback}
          />
        </Section>
        <Section title="Statistics">
          {good + neutral + bad === 0 ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={neutral}
              total={total}
              positivePercentage={calckOfPositiveFeedback}
            />
          )}
        </Section>
      </Container>
    );
  }
}

export default App;
