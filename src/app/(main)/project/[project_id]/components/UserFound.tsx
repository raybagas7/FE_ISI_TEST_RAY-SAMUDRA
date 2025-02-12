'use client';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { TeamUser } from '@/interface/dto';
import agent from '@/lib/agent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

interface Props {
  userData: TeamUser;
}

const UserFound = ({ userData }: Props) => {
  const { project_id } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: assignMutate,
    isPending: assignPending,
    data: assignData,
    error: assignError,
    reset: assigneset,
  } = useMutation({
    mutationFn: async () => {
      return await agent.User.postAssignUserToProject({
        projectId: project_id,
        userId: userData.user.id,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['PROJECT_MEMBER', project_id],
      });
    },
  });

  return (
    <Card title="User Found!" className="mt-2">
      <Card className="shadow-none">
        <p className="space-x-2">
          <span>Name:</span>
          <span>{userData.user.name}</span>
        </p>
        <p className="space-x-2">
          <span>Email:</span>
          <span>{userData.user.email}</span>
        </p>
        <p className="space-x-2">
          <span>Role:</span>
          <span>{userData.user.role}</span>
        </p>
      </Card>
      <div className="flex justify-end mt-2">
        <Button isloading={assignPending} onClick={() => assignMutate()}>
          Add User
        </Button>
      </div>
    </Card>
  );
};

export default UserFound;
