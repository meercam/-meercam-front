import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface MyModalProps {
  isOpen: boolean;
  setIsOpen: any;
}

export default function AlertModal({isOpen, setIsOpen}: MyModalProps) {
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    신고하기
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      신고 시 주변 경찰서에 연락이 갑니다. 정말 신고하겠습니까?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end items-center gap-2 text-sm">
                    <button 
                      type="button"
                      className="inline-flex justify-center rounded-md border px-2 py-1.5 border-gray-500 focus:outline-none focus-visible:ring-2"
                      onClick={closeModal}
                    >
                      취소하기
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border px-2 py-1.5 border-red-500 focus:outline-none focus-visible:ring-2"
                      onClick={closeModal}
                    >
                      신고하기
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}