'use client';
import Button from '@/components/ui/button';
import DatePickerPopover from '@/components/ui/datepicker';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import PopOver from '@/components/ui/popover';
import TextArea from '@/components/ui/textarea';
import ThinCard from '@/components/ui/thincard';
import { ProjectMember } from '@/interface/dto';
import agent from '@/lib/agent';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import { useToast } from '@/hooks/Toaster';

interface Props {
  projectMember: ProjectMember[];
}

type TaskDataProps = {
  title: string;
  description: string;
  projectId: string;
  dueDate: Date | undefined;
  assignedTo: string;
};

const CreateTask = ({ projectMember }: Props) => {
  const { project_id } = useParams();
  const { showToast } = useToast();
  const [taskData, setTaskData] = useState<TaskDataProps>({
    title: '',
    description: '',
    projectId: project_id as string,
    dueDate: undefined,
    assignedTo: '',
  });
  const [selectedMember, setSelectedMember] = useState<ProjectMember | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isOpenAssign, setIsOpenAssign] = useState(false);

  const handleTaskData = (name: string, value: string | Date) => {
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssignMember = (member: ProjectMember) => {
    // Set the assigned user ID and selected member details
    handleTaskData('assignedTo', member.userId);
    setSelectedMember({
      userId: member.userId,
      name: member.name,
      email: member.email,
      role: member.role,
    });
    setIsOpenAssign(false);
  };

  const {
    mutate: createTaskMutate,
    isPending: createTaskPending,
    data: createTaskData,
  } = useMutation({
    mutationFn: async () => {
      return await agent.Task.postCreateTaks(taskData);
    },
    onSuccess: (data) => {
      showToast({
        title: 'Task Created',
        description: `${data.title} task has been created successfully.`,
        type: 'success',
      });
      setDialogOpen(false);
      setTaskData({
        title: '',
        description: '',
        projectId: project_id as string,
        dueDate: undefined,
        assignedTo: '',
      });
    },
  });

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>Create New Task</Button>
      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        <h2 className="text-xl font-semibold text-center">Create New Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTaskMutate();
          }}
          className="mt-4 flex flex-col gap-2"
        >
          <Input
            type="text"
            label="Task Title"
            placeholder="Task Name"
            value={taskData.title}
            onChange={(e) => handleTaskData('title', e.target.value)}
          />
          <TextArea
            label="Description"
            placeholder="Task Description"
            value={taskData.description}
            onChange={(e) => handleTaskData('description', e.target.value)}
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium text-primary capitalize">
              Due Date
            </label>
            <DatePickerPopover
              date={taskData.dueDate}
              setDate={(d) => handleTaskData('dueDate', d as Date)}
            />
          </div>
          <div className="w-full">
            <label className="text-sm font-medium text-primary capitalize">
              Assign to
            </label>
            <PopOver
              isOpen={isOpenAssign}
              setIsopen={setIsOpenAssign}
              side="top"
              trigger={
                <Button className="w-full justify-between" variant="outline">
                  {taskData.assignedTo ? (
                    <>
                      <div className="flex gap-2 items-center justify-center">
                        <CircleUserRound className="size-5" />
                        <span>{selectedMember?.name}</span>
                      </div>
                      <div>
                        <p>
                          <span>{selectedMember?.email}</span>/
                          <span>{selectedMember?.role}</span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>Assign To</>
                  )}
                </Button>
              }
              content={
                <div>
                  <h3 className="text-center text-lg font-bold">
                    Click to choose
                  </h3>
                  {projectMember?.map((member) => (
                    <ThinCard
                      onClick={() => handleAssignMember(member)}
                      className="mt-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    >
                      <div className="flex gap-2 items-center justify-center">
                        <CircleUserRound className="size-5" />
                        <span>{member.name}</span>
                      </div>
                      <div>
                        <p>
                          <span>{member.email}</span>
                          <span>/{member.role}</span>
                        </p>
                      </div>
                    </ThinCard>
                  ))}
                </div>
              }
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={() => setDialogOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button isloading={createTaskPending} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default CreateTask;
