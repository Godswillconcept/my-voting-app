import React from 'react';
import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';

const PlatformModal = ({ openModal, onClose, onSubmit, platform, handleChange }) => {
  return (
    <Modal show={openModal} onClose={onClose}>
      <Modal.Header>Add New Platform</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} enctype="multipart/form-data">
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Platform Name" />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Platform Name"
                value={platform.name}
                onChange={handleChange}
                required
                shadow
              />
            </div>

            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Platform Description
            </label>
            <textarea
              id="description"
              name="description"
              value={platform.description}
              onChange={handleChange}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Platform Description"
            ></textarea>

            <div id="fileUpload" className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Platform Emblem" />
              </div>
              <FileInput
                id="file"
                name="emblem"
                accept="*"
                onChange={handleChange}
                helperText="A platform emblem is useful to confirm your choice of platform"
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Submit</Button>
        <Button
          color="transparent"
          className="bg-red-500 text-white hover:bg-red-800"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlatformModal;
