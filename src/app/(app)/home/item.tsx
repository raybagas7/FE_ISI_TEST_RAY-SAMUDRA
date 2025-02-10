import { Project } from '@/interface/dto';
import clsx from 'clsx';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';
import { GiTrashCan } from 'react-icons/gi';
import { RiTodoFill } from 'react-icons/ri';
import useMeasure from 'react-use-measure';

type Props = {
  index: number;
  project: Project;
} & HTMLMotionProps<'div'>;

export const Item = React.forwardRef<HTMLDivElement, Props>(
  ({ className, index, project, ...rest }, ref) => {
    const [isShowingList, setIsShowingList] = React.useState(false);
    const [innerRef, { height }] = useMeasure();

    return (
      <motion.div
        key={project.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: 'auto',
          opacity: 1,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        ref={ref}
        className={className}
        {...rest}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
            scale: 1,
            filter: 'blur(4px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 0.98,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            y: 8,
            scale: 0.98,
            filter: 'blur(4px)',
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={clsx(['flex flex-col', 'py-1'])}
        >
          <motion.div
            className={clsx([
              'flex flex-col box-content',
              'px-4 py-1 rounded-xl',
              'bg-white border border-gray-300',
              'hover:shadow-md transition-shadow duration-300 cursor-pointer',
            ])}
            initial={{
              opacity: 0,
              height: 0,
              borderWidth: 0,
            }}
            animate={{
              opacity: 1,
              height: height > 0 ? height : 'auto',
              borderWidth: 1,
            }}
            exit={{
              opacity: 0,
              height: 0,
              borderWidth: 0,
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div ref={innerRef}>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-neutral-950 text-lg">{project.title}</p>
                  <p className="text-neutral-950 text-base">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <RiTodoFill
                    onClick={() => setIsShowingList((prev) => !prev)}
                    className="text-neutral-600"
                  />
                </div>
              </div>
              <AnimatePresence mode="popLayout">
                {isShowingList && (
                  <motion.div
                    className="mt-1 pb-4"
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        delay: 0.01,
                        duration: 0.1,
                        ease: 'easeOut',
                      },
                    }}
                    exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);
