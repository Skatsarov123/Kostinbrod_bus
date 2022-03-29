<?php

namespace App\Controller;

use App\Repository\ScheduleRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/schedule')]
class ScheduleController extends AbstractController
{
    public function __construct(
        private ScheduleRepository      $scheduleRepository,

    )
    {

    }
    #[Route('/all', name: 'all_schedule', methods: ['GET'])]
    public function index(): Response
    {
        $data = $this->scheduleRepository->findAll();

        $arrayCollection = array();
        foreach($data as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'name'=>$item->getName(),
            );
        }
        return new JsonResponse($arrayCollection);
    }
    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     * @throws \Exception
     */
    #[Route('/create', name: 'schedule_create', methods: ['POST'])]
    public function new(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('Authorization');

        if (null === $apiToken) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new JsonResponse('No API token provided',403);
        }else {

            $jsonData = json_decode($request->getContent());
            $schedule = $this->scheduleRepository->create($jsonData);

            return new JsonResponse($schedule, Response::HTTP_OK);

        }
    }

    #[Route('/getOne/{id}', name: 'schedule_getOne')]
    public function getOne($id): JsonResponse
    {

        $item = $this->scheduleRepository-> findOneBy(['id'=>$id]);


        $schedule = [
            'id' => $item->getId(),
            'name'=>$item->getName(),

        ];

        return new JsonResponse($schedule, Response::HTTP_OK);
    }

    /**
     * @Route("/update/{id}", name="update_schedule", methods={"PUT"})
     */
    public function edit( Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $schedule = $this->scheduleRepository->findOneBy(['id'=>$request->get('id')]);

        empty($data['name']) ? true : $schedule->setName($data['name']);

        $updatedSchedule = $this->scheduleRepository->update($schedule);

        return new JsonResponse($updatedSchedule, Response::HTTP_OK);
       

    }
}
