<?php

namespace App\Controller;


use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;


#[Route('/api')]
class AuthController extends AbstractController
{


    public function __construct(
        private UserRepository      $userRepository,
        private Security            $security,
        private SerializerInterface $serializer
    )
    {

    }

    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     */
    #[Route('/register', name: 'user.register', methods: ['POST'])]
    public function app(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent());
        $user = $this->userRepository->create($jsonData);

        return new JsonResponse([
            'user' => $this->serializer->serialize($user, 'json'),


        ], 201);
    }


    #[Route('/logout', name: 'user.logout')]
    public function onLogoutSuccess(): void
    {
        throw new \Exception('Ok');
    }


    #[Route('/profile', name: 'user.profile')]
    public function profile() : JsonResponse
    {
        $currentUser = $this->security->getUser();
        $user = $this->serializer->serialize($currentUser, 'json');
        return new JsonResponse([
            $user
        ], 200);
    }

}
