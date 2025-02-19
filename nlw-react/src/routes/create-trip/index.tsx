import { FormEvent, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-ste"

export function CreateTripPage() {

    const navigate = useNavigate()

    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModaltOpen] = useState(false)
    const [emailsToInvite, setEmailsToInvite] = useState(['samaragarofalo@icloud.com'])
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

    function openGuestInput() {
        setIsGuestInputOpen(true)
    }

    function closeGuestInput() {
        setIsGuestInputOpen(false)
    }

    function openGuestModal() {
        setIsGuestModaltOpen(true)
    }

    function closeGuestModal() {
        setIsGuestModaltOpen(false)
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get("email")?.toString()

        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }

        setEmailsToInvite([...emailsToInvite, email])

        event.currentTarget.reset()

    }

    function removeEmailFromInvites(emailToRemove: string){
        const newEmailList = emailsToInvite.filter(email =>  email !== emailToRemove)

        setEmailsToInvite(newEmailList)
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        navigate('trips/123')
    }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className="space-y-4">

          <DestinationAndDateStep 
            closeGuestInput={closeGuestInput} 
            isGuestInputOpen={isGuestInputOpen} 
            openGuestInput={openGuestInput} 
          />

          {isGuestInputOpen && (
            <InviteGuestsStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} openGuestModal={openGuestModal}/>
          )}

        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos <br/>
          <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">politicas de privacidade</a>.
        </p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestsModal 
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestModal={closeGuestModal}
            removeEmailFromInvites={removeEmailFromInvites}
            />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
            closeConfirmTripModal={closeConfirmTripModal} 
            createTrip={createTrip}
        />
      )}

    </div>
  )
}
