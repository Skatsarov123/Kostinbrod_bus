<?php

namespace App\Controller;


use App\Repository\ScheduleRepository;
use App\Repository\ScheduleTimeRepository;

use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/scheduleTime')]
class ScheduleTimeController extends AbstractController
{


    public function __construct(
        private ScheduleTimeRepository      $scheduleTimeRepository,
    )
    {

    }
    #[Route('/allSchedulesTime', name: 'all_scheduleTime', methods: ['GET'])]
    public function index(): Response
    {
        $data = $this->scheduleTimeRepository->findAll();


        $arrayCollection = array();
        foreach($data as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'departure_time'=>$item->getDepartureTime(),
                'place' =>$item->getPlace(),
                'scheduleId' => $item->getScheduleId(),
                'schedule_name' => $item->getScheduleName(),
                'isHolliday' =>$item->getIsHoliday()

            );
        }
        return new JsonResponse($arrayCollection);
    }
    /**
     * @throws OptimisticLockException
     * @throws ORMException
     * @throws Exception
     */
    #[Route('/create', name: 'scheduleTime_create', methods: ['POST'])]
    public function new( Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('Authorization');

        if (null === $apiToken) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new JsonResponse('No API token provided',401);
        }else {

            $jsonData = json_decode($request->getContent());
            $scheduleTime = $this->scheduleTimeRepository->create($jsonData);
            return new JsonResponse($scheduleTime, Response::HTTP_OK);

        }
    }

    #[Route('/getOne/{id}', name: 'scheduleTime_getOne')]
    public function getOne(int $id): JsonResponse
    {

        $data = $this->scheduleTimeRepository->find($id);


        $arrayCollection = [
            'place' => $data->getPlace(),
            'departure_time'=>$data->getDepartureTime(),
            'isHolliday' =>$data->getIsHoliday()

        ];

            return new JsonResponse($arrayCollection, Response::HTTP_OK);

    }

    /**
     * @Route("/update/{id}", name="update_schedule", methods={"PUT"})
     */
    public function edit( Request $request): JsonResponse
    {

        $apiToken = $request->headers->get('Authorization');


        if (null === $apiToken) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new JsonResponse('No API token provided',401);
        }else {
            $data = json_decode($request->getContent(), true);

            $scheduleTime = $this->scheduleTimeRepository->findOneBy(['id' => $request->get('id')]);

            empty($data['departure_time']) ? true : $scheduleTime->setDepartureTime($data['departure_time']);
            empty($data['place']) ? true : $scheduleTime->setPlace($data['place']);
            empty($data['isHoliday']) ? $scheduleTime->setIsHoliday(0)  : $scheduleTime->setIsHoliday($data['isHoliday']);


            $updatedSchedule = $this->scheduleTimeRepository->update($scheduleTime);

            return new JsonResponse($updatedSchedule, Response::HTTP_OK);
        }

    }
    #[Route('/delete/{id}', name: 'scheduleTime_delete',methods:['DELETE'])]
    public function remove(Request $request): JsonResponse
    {

        $apiToken = $request->headers->get('Authorization');

        if (null === $apiToken) {

            return new JsonResponse('No API token provided',403);
        }else {

            $schedule = $this->scheduleTimeRepository->findOneBy(['id' => $request->get('id')]);

            $this->scheduleTimeRepository->deleteSchedule($schedule);

            return new JsonResponse( 'Success',204);
        }

    }
}