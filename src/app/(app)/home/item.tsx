import { Project } from '@/interface/dto';
import { formatDate } from '@/lib/utils';
import clsx from 'clsx';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import * as React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import useMeasure from 'react-use-measure';

type Props = {
  project: Project;
} & HTMLMotionProps<'div'>;

export const Item = React.forwardRef<HTMLDivElement, Props>(
  ({ className, project, ...rest }, ref) => {
    const [isShowingList, setIsShowingList] = React.useState(false);
    const [innerRef, { height }] = useMeasure();
    const router = useRouter();
    return (
      <motion.div
        onClick={() => router.push(`project/${project.id}`)}
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
          <button
            className={clsx(
              'absolute right-2 top-2 transition-transform hover:bg-primary/10 rounded-full p-1',
              isShowingList && 'rotate-180'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsShowingList((prev) => !prev);
            }}
          >
            <IoIosArrowDown className="text-primary size-5" />
          </button>
          <motion.div
            className={clsx([
              'flex flex-col box-content',
              'px-4 py-2 rounded-xl',
              'bg-white border border-border',
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
              <div>
                <div>
                  <p className="text-neutral-950 text-lg">{project.title}</p>
                  <p className="text-neutral-950 text-base">
                    {project.description ? (
                      project.description
                    ) : (
                      <span className="text-black font-bold italic">
                        No Description
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                {isShowingList && (
                  <motion.div
                    className="mt-1"
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
                  >
                    <p>{formatDate(new Date(project.createdAt))}</p>
                    <p>{formatDate(new Date(project.updatedAt))}</p>
                    <p>
                      {project.deletedAt
                        ? formatDate(new Date(project.deletedAt))
                        : ''}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);
