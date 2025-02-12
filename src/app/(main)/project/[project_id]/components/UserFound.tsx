'use client';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { useToast } from '@/hooks/Toaster';
import { TeamUser } from '@/interface/dto';
import agent from '@/lib/agent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

interface Props {
  userData: TeamUser;
  handleClose: () => void;
}

const UserFound = ({ userData, handleClose }: Props) => {
  const { project_id } = useParams();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: assignMutate, isPending: assignPending } = useMutation({
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
      showToast({
        title: `${userData.user.name} Assigned`,
        description: `${userData.user.name} joining this project!`,
        type: 'success',
      });
      handleClose();
    },
    onError(error) {
      showToast({
        title: `${userData.user.name} already assign`,
        description: `Contact him directly to tell the ${error.message}`,
        type: 'error',
      });
      handleClose();
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
        <Button
          className="w-full"
          isloading={assignPending}
          onClick={() => assignMutate()}
        >
          Assign user to this project
        </Button>
      </div>
    </Card>
  );
};

export default UserFound;
