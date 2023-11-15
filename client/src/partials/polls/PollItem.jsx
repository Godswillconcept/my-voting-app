import { Button, Progress } from "flowbite-react";
import React from "react";

function PollItem() {
  return (
    <>
      <div className="pt-8">
        <h1 className="text-xl font-extrabold leading-none tracking-tight sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold text-center title">
          Polls & Analysis
        </h1>
        <div className="flex items-center md:flex-row flex-col mb-12">
          <div className="md:w-1/2 pt-8">
            <h3 className="mb-8 px-8 md:text-3xl sm:text-2xl text-xl leading-snug font-semibold">
              Poll for the position of PRO
            </h3>
            <p className="mb-8 text-lg px-8">
              Sed porta ac justo iaculis pellentesque. Proin consectetur mollis
              lorem, quis mattis leo sollicitudin vehicula. Donec non venenatis
              est, quis consequat quam. In rutrum porttitor magna eu euismod.
              Aliquam et posuere metus, eget laoreet orci. Cras elementum erat
              sit amet gravida ultricies. Nullam imperdiet eros massa, in semper
              massa egestas ut. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Donec sit amet enim fermentum, posuere nulla sed,
              porta neque.
            </p>
            <div className="flex items-center">
              <div className="w-1/2 px-8">
                <div className="mb-8">
                  <div className="flex justify-between">
                    <h6 className="font-bold">NYP</h6>
                    <h6 className="font-bold">95%</h6>
                  </div>
                  <Progress progress={95} color="blue" />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h6 className="font-bold">CTP</h6>
                    <h6 className="font-bold">85%</h6>
                  </div>
                  <Progress progress={85} color="yellow" />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h6 className="font-bold">OTP</h6>
                    <h6 className="font-bold">50%</h6>
                  </div>
                  <Progress progress={50} color="red" />
                </div>
              </div>
              <div className="w-1/2 px-8">
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h6 className="font-bold">ZTP</h6>
                    <h6 className="font-bold">90%</h6>
                  </div>
                  <Progress progress={90} color="yellow" />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h6 className="font-bold">QWT</h6>
                    <h6 className="font-bold">35%</h6>
                  </div>
                  <Progress progress={35} color="dark" />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h6 className="font-bold">WPS</h6>
                    <h6 className="font-bold">85%</h6>
                  </div>
                  <Progress progress={85} color="green" />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 py-8 px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="platform emblem"
                />
                <div className="absolute bg-white/50 text-blue-800 left-0 right-0 bottom-0 rounded-b-lg p-2 md:p-4 lg:p-6 text-bold">
                  <h2 className="text-xl font-medium">NYP</h2>
                </div>
              </div>
              <div className="relative">
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                  alt="platform emblem"
                />
                <div className="absolute bg-white/50 text-blue-800 left-0 right-0 bottom-0 rounded-b-lg p-2 md:p-4 lg:p-6 text-bold">
                  <h2 className="text-xl font-medium">NYP</h2>
                </div>
              </div>
              <div className="relative">
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                  alt="platform emblem"
                />
                <div className="absolute bg-white/50 text-blue-800 left-0 right-0 bottom-0 rounded-b-lg p-2 md:p-4 lg:p-6 text-bold">
                  <h2 className="text-xl font-medium">NYP</h2>
                </div>
              </div>
              <div className="relative">
                <img
                  class="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                  alt="platform emblem"
                />
                <div className="absolute bg-white/50 text-blue-800 left-0 right-0 bottom-0 rounded-b-lg p-2 md:p-4 lg:p-6 text-bold">
                  <h2 className="text-xl font-medium">NYP</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-62 hero">
        <div className="bg-blue-900/90 text-white h-full p-24">
          <h2 className="text-xl font-extrabold leading-none tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Call To Action
          </h2>
          <div className="flex justify-between flex-wrap py-2">
            <p className="w-2/3 lg:text-base md:text-sm sm:text-xs mb-8">
              Vestibulum lacinia lorem id semper pellentesque. Nunc sagittis,
              est tincidunt posuere ullamcorper, lacus lectus tincidunt nisi,
              sed consequat nunc massa a massa.
            </p>
            <Button color="transparent" pill className="outline md:px-8 px-6">
              Call To Action
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PollItem;
