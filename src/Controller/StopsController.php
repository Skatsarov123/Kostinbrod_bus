<?php

namespace App\Controller;


use App\Repository\StopsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/stops')]
class StopsController extends AbstractController
{
    public function __construct(
        private StopsRepository      $stopsRepository,

    )
    {

    }
    #[Route('/allStops', name: 'all_stops', methods: ['GET'])]
    public function index(): Response
    {
        $data = $this->stopsRepository->findAll();

        $arrayCollection = array();
        foreach($data as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'name'=>$item->getName(),
                'latitude'=>$item->getLatitude(),
                'longitude'=>$item->getLongitude()
            );
        }
        return new JsonResponse($arrayCollection);
    }
    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     * @throws \Exception
     */
    #[Route('/create', name: 'stop_create', methods: ['POST'])]
    public function new(Request $request): JsonResponse
    {
        $apiToken = $request->headers->get('Authorization');

        if (null === $apiToken) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            return new JsonResponse('No API token provided',403);
        }else {

            $jsonData = json_decode($request->getContent());

            $stop = $this->stopsRepository->create($jsonData);

            return new JsonResponse($stop, Response::HTTP_OK);

        }
    }

    #[Route('/getOne/{id}', name: 'stop_getOne')]
    public function getOne(  $id): JsonResponse
    {

            $arr = explode(",", $id);
        for ($x = 0; $x < count($arr); $x++) {
            $test[] = $arr[$x];
        }
        $data = $this->stopsRepository-> findBy(array('id' => $test));


        $arrayCollection = array();
        foreach($data as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'name'=>$item->getName(),
                'latitude'=>$item->getLatitude(),
                'longitude'=>$item->getLongitude()
            );
        }

        return new JsonResponse($arrayCollection);

    }

    /**
     * @Route("/update/{id}", name="update_schedule", methods={"PUT"})
     */
    public function edit( Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $schedule = $this->stopsRepository->findOneBy(['id'=>$request->get('id')]);

        empty($data['name']) ? true : $schedule->setName($data['name']);
        empty($data['latitude']) ? true : $schedule->setLatitude($data['latitude']);
        empty($data['longitude']) ? true : $schedule->setLongitude($data['longitude']);

        $updatedSchedule = $this->stopsRepository->update($schedule);

        return new JsonResponse($updatedSchedule, Response::HTTP_OK);


    }
}
