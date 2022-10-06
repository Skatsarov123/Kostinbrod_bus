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
        private ContactRepository $contactRepository,

    )
    {

    }

    #[Route('/allMessages', name: 'all_messages', methods: ['GET'])]
    public function index(): Response
    {
        $data = $this->contactRepository->findAll();

        $arrayCollection = array();
        foreach ($data as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'name' => $item->getName(),
                'email' => $item->getEmail(),
                'phone' => $item->getPhone(),
                'message' => $item->getMessage(),

            );
        }
        return new JsonResponse($arrayCollection);
    }

    #[Route('/create', name: 'message_create', methods: ['POST'])]
    public function new(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent());
        $message = $this->contactRepository->create($jsonData);

        return new JsonResponse($message, Response::HTTP_OK);

    }

    #[Route('/getOne/{id}', name: 'message_getOne')]
    public function getOne($id): JsonResponse
    {

        $item = $this->contactRepository->find($id);


        $message = [
            'id' => $item->getId(),
            'name' => $item->getName(),
            'email' => $item->getEmail(),
            'phone' => $item->getPhone(),
            'message' => $item->getMessage(),
        ];

        return new JsonResponse($message, Response::HTTP_OK);
    }
}