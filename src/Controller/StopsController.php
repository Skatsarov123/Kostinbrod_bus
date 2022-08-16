<?php

namespace App\Controller;


use App\Repository\StopsRepository;
use JetBrains\PhpStorm\NoReturn;
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
    public function getOne(int $id): JsonResponse
    {

        $data = $this->stopsRepository->find($id);


        $arrayCollection = [
            'name' => $data->getName(),
            'latitude'=>$data->getLatitude(),
            'longitude' =>$data->getLongitude()

        ];

        return new JsonResponse($arrayCollection, Response::HTTP_OK);

    }

    #[Route('/getBy/{id}', name: 'stop_getBy')]
    public function getBy($id): JsonResponse
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

    #[Route('/findCurrent', name: 'find_current')]
    public function findCurrent(Request $request): JsonResponse
    {


        $data = $this->stopsRepository-> findBy(array('id' => $request->get('stop_location')));


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

    #[Route('/update/{id}', name: 'stop_update')]
    public function edit( Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $stop = $this->stopsRepository->findOneBy(['id'=>$request->get('id')]);

        empty($data['name']) ? true : $stop->setName($data['name']);
        empty($data['latitude']) ? true : $stop->setLatitude($data['latitude']);
        empty($data['longitude']) ? true : $stop->setLongitude($data['longitude']);

        $updatedStop = $this->stopsRepository->update($stop);

        return new JsonResponse($updatedStop, Response::HTTP_OK);


    }

    #[Route('/delete/{id}', name: 'stop_delete',methods:['DELETE'])]
    public function remove(Request $request): JsonResponse
    {

        $apiToken = $request->headers->get('Authorization');

        if (null === $apiToken) {

            return new JsonResponse('No API token provided',403);
        }else {

            $stop = $this->stopsRepository->findOneBy(['id' => $request->get('id')]);

            $this->stopsRepository->deleteStop($stop);

            return new JsonResponse( 'Success',204);
        }

    }
}
