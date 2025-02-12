'use client';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import ThinCard from '@/components/ui/thincard';
import { ProjectMember } from '@/interface/dto';
import React, { useState } from 'react';
import { CircleUserRound } from 'lucide-react';

interface Props {
  projectMember: ProjectMember[];
}

const ViewMember = ({ projectMember }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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

        <div>
          {projectMember && projectMember?.length > 0 ? (
            <div className="space-y-2 mt-2">
              {projectMember.map((member) => {
                return (
                  <ThinCard>
                    <div className="flex gap-2 items-center justify-center">
                      <CircleUserRound className="size-5" />
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
      </Dialog>
    </>
  );
};

export default ViewMember;
