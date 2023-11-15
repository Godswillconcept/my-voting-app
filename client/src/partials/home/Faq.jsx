import { Accordion } from "flowbite-react";
import React from "react";

function Faq() {
  return (
    <div className="py-16">
      <div className="text-center">
        <h2 className="text-xl font-bold leading-none tracking-tight sm:text-2xl md:text-3xl lg:text-4xl title mb-6">
          Frequently Asked Questions
        </h2>
        <p className="w-2/3 mx-auto lg:text-lg md:text-base sm:text-sm text-xs">
          Whether you're new to the platform or a seasoned user, you'll find
          valuable insights into how to navigate, participate, make the most of
          your experience. If you don't find the information you're looking for,
          feel free to reach out to our support team for further assistance.
        </p>
      </div>

      <div className="md:mx-40 sm:mx-20 mx-10 mt-16">
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>How do I vote on a poll?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                To vote on a poll, simply click on the "Vote" button on the poll
                card. You can choose your preferred option, and your vote will
                be counted instantly.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              Can I change my vote after submitting it?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                No, once you've submitted your vote, it cannot be changed. Make
                sure to review your choice before clicking the "Vote" button.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>How are poll results calculated?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Poll results are calculated in real-time. As users vote, the
                system updates the vote counts for each option, allowing you to
                see the current status of the poll.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>What happens when a poll expires?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                When a poll reaches its expiration date, it is closed, and no
                further votes can be cast. The final results are displayed, and
                the poll is marked as completed.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              How can I create my own poll on this platform?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                To create your own poll, go to your user dashboard and select
                the "Create Poll" option. You can enter the poll question, add
                options, and specify the expiration date to set up your poll.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
}

export default Faq;
