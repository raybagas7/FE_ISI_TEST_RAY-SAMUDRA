import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Spinner from '@/components/ui/spinner';
import ThinCard from '@/components/ui/thincard';
import agent from '@/lib/agent';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
const ViewMember = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { project_id } = useParams();

  const { data: projectMember, isPending } = useQuery({
    queryKey: ['PROJECT_MEMBER', { projectId: project_id }],
    queryFn: async () =>
      await agent.User.getUserByProjectId({ projectId: project_id }),
  });

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>View Member</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <h2 className="text-xl font-semibold text-center">
          List of the member
        </h2>
        {isPending ? (
          <Spinner className="mt-4" />
        ) : (
          <div>
            {projectMember && projectMember?.length > 0 ? (
              <div>
                {projectMember.map((member) => {
                  return (
                    <ThinCard>
                      <div className="flex gap-2 items-center justify-center">
                        <IoPersonCircleOutline className="size-5" />
                        <span>{member.name}</span>
                      </div>
                      <p>
                        <span>{member.email}</span>
                        <span>/{member.role}</span>
                      </p>
                    </ThinCard>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 text-center">
                No user assigned to this project yet
              </div>
            )}
          </div>
        )}
      </Dialog>
    </>
  );
};

export default ViewMember;
