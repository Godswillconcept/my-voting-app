import { Dropdown, Navbar, Avatar, Modal, Button } from "flowbite-react";
import React, { useState } from "react";
import logo from "../../images/voting_2 transparent.png";
import { Outlet, useLocation } from "react-router-dom";
import profile from "../../images/profile.svg";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Header() {
  const location = useLocation();

  const isActive = (href) => location.pathname === href;
  const [openModal, setOpenModal] = useState(false);
  return (
    <header className="fixed left-0 right-0 border-b-2">
      <Navbar>
        <Navbar.Brand href="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="one-vote Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            OneVote
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={profile}
                rounded
                className="border border-primary rounded-full"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item  onClick={() => setOpenModal(true)}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={isActive('/')}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/polls"  active={isActive('/polls')}>Polls</Navbar.Link>
          <Navbar.Link href="/results"  active={isActive('/results')}>Results</Navbar.Link>
          <Navbar.Link href="/updates"  active={isActive('/updates')}>Updates</Navbar.Link>
          <Navbar.Link href="/register"  active={isActive('/register')}>Register</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to logout of OneVote?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;
