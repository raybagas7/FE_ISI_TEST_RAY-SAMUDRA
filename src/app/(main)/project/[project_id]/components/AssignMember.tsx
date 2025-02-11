'use client';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import agent from '@/lib/agent';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import UserFound from './UserFound';

const AssignMember = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const {
    mutate: userMutate,
    isPending: userPending,
    data: userData,
    error: userError,
    reset: useReset,
  } = useMutation({
    mutationFn: async () => {
      return await agent.User.getTeamUserByEmail({ email });
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setEmail('');
    useReset();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Assign New Member</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleClose();
        }}
      >
        <h2 className="text-xl font-semibold text-center">
          Assign New Member to Project
        </h2>
        <form className="mt-4 flex flex-col gap-2">
          <Input
            type="Email"
            label="Team Member Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              userMutate();
            }}
            disabled={userPending}
            isloading={userPending}
          >
            Search
          </Button>
        </form>
        <div>
          {userError && (
            <p className="text-destructive text-center mt-2 font-bold">
              Team role user with this email not found
            </p>
          )}
          {userData && <UserFound userData={userData} />}
        </div>
      </Dialog>
    </>
  );
};

export default AssignMember;
