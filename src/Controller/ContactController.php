<?php

namespace App\Controller;

use App\Repository\ContactRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/contact')]
class ContactController extends AbstractController
{
    public function __construct(
        private ContactRepository      $contactRepository,

    )
    {

    }

    #[Route('/create', name: 'message_create', methods: ['POST'])]
    public function new(Request $request): JsonResponse
    {
            $jsonData = json_decode($request->getContent());
            $message = $this->contactRepository->create($jsonData);

            return new JsonResponse($message, Response::HTTP_OK);

        }
}