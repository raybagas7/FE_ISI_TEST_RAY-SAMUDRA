'use client';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import React, { useState } from 'react';

const CreateTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end">
      <Button onClick={() => setIsOpen(true)}>Create New Task</Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold">Create New Task</h2>
        <form className="mt-4 flex flex-col gap-2">
          <Input type="text" label="Task" placeholder="Task Name" />
          <TextArea label="Description" placeholder="Task Description" />

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateTask;
