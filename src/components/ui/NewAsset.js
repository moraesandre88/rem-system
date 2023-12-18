import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import useFetchPrivate from "../../modules/hooks/useFetchPrivate";
import useGlobal from "../../modules/hooks/useGlobal";
import Loading from "../loading/Loading";
import styles from "../../assets/styles/NewAsset.module.css";

const NewAsset = () => {
  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
      size: 0,
      type: "apartamento",
      rooms: {
        rooms: 0,
        bedrooms: 0,
        bathrooms: 0,
        parkingSpaces: 0,
      },
      extra: {
        laundry: false,
        kitchen: false,
        suite: false,
        office: false,
        balcony: false,
        gourmetBalcony: false,
      },
      services: {
        petFriendly: false,
        airConditioning: false,
        internet: false,
        locker: false,
        elevator: false,
        generator: false,
        furnished: false,
        concierge: false,
        sauna: false,
        gym: false,
        playRoom: false,
        babyRoom: false,
        gamesRoom: false,
        gourmetArea: false,
        partyRoom: false,
        barbecue: false,
        swimmingPool: false,
      },
      security: {
        safety24hours: false,
        gatedCondominium: false,
        intercom: false,
        alarmSystem: false,
        watcher: false,
      },
      status: {
        selling: false,
        rental: false,
      },
      values: {
        monthlyCondominium: 0,
        annualTax: 0,
        sellingPrice: 0,
        rentalPrice: 0,
      },
      owners: [
        {
          name: "",
          phoneNumber: "",
          email: "",
        },
      ],
      images: [],
      description: "",
    },
    mode: "onTouched",
  });
  const { fields, append, remove } = useFieldArray({
    name: "owners",
    control,
  });
  const sellingWatcher = watch("status.selling", false);
  const rentalWatcher = watch("status.rental", false);
  const gatedCondominiumWatcher = watch("security.gatedCondominium", false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [enumValues, setEnumValues] = useState([]);
  const fetchPrivate = useFetchPrivate();
  const { auth } = useGlobal();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const getAssetsEnum = async () => {
      try {
        const response = await fetchPrivate(
          "http://localhost:3500/assets/newasset",
          {
            method: "GET",
            signal: controller.signal,
            credentials: "include",
          }
        );
        if (!response.ok) {
          if ([401, 403, 500].includes(response?.status)) {
            const responseData = await response.json();
            setMessage(responseData?.message);
          } else {
            setMessage("Falha na obtenção dos dados");
          }
        } else {
          if (response.status === 204) {
            setMessage("Falha na obtenção (campo: Tipos)");
          } else {
            const responseData = await response.json();
            mounted && setEnumValues(responseData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAssetsEnum();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handleFileInput = (e) => {
    const files = e.target.files;
    const convertedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        convertedFiles.push(e.target.result);
        if (i === files.length - 1) {
          setImageFiles([...imageFiles, ...convertedFiles]);
        }
      };
    }
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
  };

  const submitData = async (data) => {
    setMessage("");
    data.images = [...imageFiles];
    data.username = auth.username;
    console.log(data);
    let mounted = true;
    const controller = new AbortController();

    try {
      const response = await fetchPrivate(
        "http://localhost:3500/assets/newasset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          signal: controller.signal,
          credentials: "include",
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        if ([400, 409, 500].includes(response?.status)) {
          setMessage(responseData?.message);
        }
      } else {
        setSuccess(true);
        mounted && setMessage(responseData?.message);
        reset();
      }
    } catch (error) {
      setMessage("Falha na criação do imóvel");
    }

    return () => {
      mounted = false;
      controller.abort();
    };
  };

  return (
    <Paper className={styles.paper} elevation={3} variant="elevation">
      <form onSubmit={handleSubmit(submitData)}>
        {/*Server's response messages*/}
        <Typography
          paragraph={true}
          gutterBottom={true}
          color={success ? "success.main" : "error.main"}
        >
          {message}
        </Typography>
        <Stack direction="row" width="100%" spacing={3}>
          <Stack direction="column" width="50%">
            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Endereço
            </Typography>
            {/*Street's field */}
            <TextField
              {...register("address.street", {
                pattern: {
                  value: /^[a-zA-Z0-9. ].{3,50}$/,
                  message: "Somente letras e números",
                },
                required: "Campo obrigatório.",
              })}
              label="Logradouro"
              variant="outlined"
              fullWidth
            />
            <Typography paragraph={true} gutterBottom={true} color="error.main">
              {errors.address?.street?.message}
            </Typography>

            <Stack
              direction="row"
              display="flex"
              //flexWrap="wrap"
              //flex={1}
              spacing={3}
            >
              <Stack direction="column">
                {/*Number's field */}
                <TextField
                  {...register("address.number", {
                    pattern: {
                      value: /^[a-zA-Z0-9. ].{1,15}$/,
                      message: "Somente letras e números",
                    },
                    required: "Campo obrigatório.",
                  })}
                  label="Número"
                  variant="outlined"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.address?.number?.message}
                </Typography>
              </Stack>

              <Stack direction="column">
                {/*Complement's field */}
                <TextField
                  {...register("address.complement")}
                  label="Complemento"
                  variant="outlined"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.address?.complement?.message}
                </Typography>
              </Stack>

              <Stack direction="column">
                {/* Neighborhood's field*/}
                <TextField
                  {...register("address.neighborhood", {
                    pattern: {
                      value: /^[a-zA-Z0-9. ].{1,15}$/,
                      message: "Somente letras e números",
                    },
                    required: "Campo obrigatório.",
                  })}
                  label="Bairro"
                  variant="outlined"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.address?.neighborhood?.message}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" display="flex" spacing={3}>
              <Stack direction="column" width="50%">
                {/*City's field */}
                <TextField
                  {...register("address.city", {
                    pattern: {
                      value: /^[a-zA-Z0-9. ].{1,50}$/,
                      message: "Somente letras e números",
                    },
                    required: "Campo obrigatório.",
                  })}
                  label="Cidade"
                  variant="outlined"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.address?.city?.message}
                </Typography>
              </Stack>

              <Stack direction="column" width="50%">
                {/*State's field */}
                <TextField
                  {...register("address.state", {
                    pattern: {
                      value: /^[a-zA-Z0-9. ].{1,50}$/,
                      message: "Somente letras e números",
                    },
                    required: "Campo obrigatório.",
                  })}
                  label="Estado"
                  variant="outlined"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.address?.state?.message}
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Características
            </Typography>
            <Stack direction="row" display="flex" spacing={3}>
              <Stack direction="column" width="33.33%">
                {/*Size's field */}
                <TextField
                  {...register("size", {
                    required: "Campo obrigatório",
                    validate: (value) =>
                      value >= 0 || "Somente números positivos",
                    valueAsNumber: true,
                  })}
                  type="number"
                  label="Tamanho (m²)"
                  variant="outlined"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.size?.message}
                </Typography>
              </Stack>

              <Stack direction="column" width="33.33%">
                <FormControl>
                  <InputLabel>Tipo</InputLabel>
                  {/*Type's field */}
                  <Select
                    {...register("type", {
                      required: "Campo obrigatório.",
                    })}
                    label="Tipo"
                    variant="outlined"
                  >
                    {enumValues.map((value, index) => (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography
                    paragraph={true}
                    gutterBottom={true}
                    color="error.main"
                  >
                    {errors.type?.message}
                  </Typography>
                </FormControl>
              </Stack>

              <Stack direction="column" width="33.33%">
                {/*Rooms's field */}
                <TextField
                  {...register("rooms.rooms", {
                    validate: (value) =>
                      value >= 0 || "Somente números positivos",
                    valueAsNumber: true,
                  })}
                  label="Salas"
                  variant="outlined"
                  type="number"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.rooms?.rooms?.message}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" display="flex" spacing={3}>
              <Stack direction="column">
                {/*Bedrooms's field */}
                <TextField
                  {...register("rooms.bedrooms", {
                    validate: (value) =>
                      value >= 0 || "Somente números positivos",
                    valueAsNumber: true,
                  })}
                  label="Quartos"
                  variant="outlined"
                  type="number"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.rooms?.bedrooms?.message}
                </Typography>
              </Stack>

              <Stack direction="column">
                {/*Bathrooms's field */}
                <TextField
                  className={styles.l_input}
                  {...register("rooms.bathrooms", {
                    validate: (value) =>
                      value >= 0 || "Somente números positivos",
                    valueAsNumber: true,
                  })}
                  label="Banheiros"
                  variant="outlined"
                  type="number"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.rooms?.bathrooms?.message}
                </Typography>
              </Stack>

              <Stack direction="column">
                {/*Parking spaces's field */}
                <TextField
                  {...register("rooms.parkingSpaces", {
                    validate: (value) =>
                      value >= 0 || "Somente números positivos",
                    valueAsNumber: true,
                  })}
                  label="Vagas"
                  variant="outlined"
                  type="number"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.rooms?.parkingSpaces?.message}
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Taxas
            </Typography>
            <Stack direction="row" width="100%" spacing={3}>
              <Stack direction="column" width="50%">
                {/*Annual tax's field */}
                <TextField
                  {...register("values.annualTax", {
                    validate: (value) =>
                      value >= 0 || "Somente números positivos",
                    valueAsNumber: true,
                  })}
                  label="IPTU (anual)"
                  variant="outlined"
                  type="number"
                />
                <Typography
                  paragraph={true}
                  gutterBottom={true}
                  color="error.main"
                >
                  {errors.values?.annualTax?.message}
                </Typography>
              </Stack>
              <Stack direction="column" width="50%">
                {gatedCondominiumWatcher && (
                  <>
                    {/*Monthly condominium's field */}
                    <TextField
                      {...register("values.monthlyCondominium", {
                        validate: (value) =>
                          value >= 0 || "Somente números positivos",
                        valueAsNumber: true,
                      })}
                      label="Condomínio (mensal)"
                      variant="outlined"
                      type="number"
                    />
                    <Typography
                      paragraph={true}
                      gutterBottom={true}
                      color="error.main"
                    >
                      {errors.values?.monthlyCondominium?.message}
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>

            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Proprietários
            </Typography>
            {fields.map((field, index) => {
              return (
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="flex-start"
                  key={field.id}
                >
                  <Stack direction="column">
                    {/*Owners name's field */}
                    <TextField
                      {...register(`owners.${index}.name`, {
                        pattern: {
                          value: /^[a-zA-Z].{1,80}$/,
                          message: "Somente letras",
                        },
                        required: "Campo obrigatório.",
                      })}
                      label="Nome"
                      variant="outlined"
                    />
                    <Typography
                      paragraph={true}
                      gutterBottom={true}
                      color="error.main"
                    >
                      {errors.owners?.[index]?.name?.message}
                    </Typography>
                  </Stack>
                  <Stack direction="column">
                    {/*Owners phone number's field */}
                    <TextField
                      {...register(`owners.${index}.phoneNumber`, {
                        pattern: {
                          value: /^[0-9].{1,11}$/,
                          message: "Somente números",
                        },
                        required: "Campo obrigatório.",
                      })}
                      label="Telefone"
                      variant="outlined"
                      type="number"
                    />
                    <Typography
                      paragraph={true}
                      gutterBottom={true}
                      color="error.main"
                    >
                      {errors.owners?.[index]?.phoneNumber?.message}
                    </Typography>
                  </Stack>
                  <Stack direction="column">
                    {/*Owners email's field */}
                    <TextField
                      {...register(`owners.${index}.email`, {
                        required: "Campo obrigatório.",
                      })}
                      label="E-mail"
                      variant="outlined"
                      type="email"
                    />
                    <Typography
                      paragraph={true}
                      gutterBottom={true}
                      color="error.main"
                    >
                      {errors.owners?.[index]?.email?.message}
                    </Typography>
                  </Stack>
                  {index > 0 && (
                    <IconButton type="button" onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>
              );
            })}
            <Stack direction="row" justifyContent="center">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => append({ name: "", phoneNumber: "", email: "" })}
              >
                Adicionar
              </Button>
            </Stack>

            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Descrição
            </Typography>
            {/*Description's field */}
            <BaseTextareaAutosize
              {...register("description", {
                required: "Campo obrigatório",
              })}
              minRows={15}
              maxRows={30}
            />
            <Typography paragraph={true} gutterBottom={true} color="error.main">
              {errors.description?.message}
            </Typography>
          </Stack>

          <Stack direction="column" width="50%">
            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Serviços e Comodidades
            </Typography>
            <Stack direction="row" width="100%" spacing={7}>
              <Stack direction="column">
                <FormGroup>
                  {/*Laundry's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("extra.laundry")} />}
                    label="Área de serviço"
                  />

                  {/*Kitchen's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("extra.kitchen")} />}
                    label="Cozinha"
                  />

                  {/*Suite's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("extra.suite")} />}
                    label="Suíte"
                  />

                  {/*Office's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("extra.office")} />}
                    label="Escritório"
                  />

                  {/*Balcony's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("extra.balcony")} />}
                    label="Varanda"
                  />

                  {/*Gourmet balcony's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("extra.gourmetBalcony")} />}
                    label="Varanda gourmet"
                  />

                  {/*Pet friendly's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.petFriendly")} />}
                    label="Pet friendly"
                  />

                  {/*Air conditioning's field */}
                  <FormControlLabel
                    control={
                      <Checkbox {...register("services.airConditioning")} />
                    }
                    label="Ar - condicionado"
                  />

                  {/*Internet's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.internet")} />}
                    label="Internet"
                  />

                  {/*Locker's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.locker")} />}
                    label="Locker"
                  />

                  {/*Elevator's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.elevator")} />}
                    label="Elevador"
                  />

                  {/*Generator's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.generator")} />}
                    label="Gerador"
                  />
                </FormGroup>
              </Stack>
              <Stack direction="column">
                <FormGroup>
                  {/*Furnish's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.furnished")} />}
                    label="Mobiliado"
                  />

                  {/*Concierge's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.concierge")} />}
                    label="Portaria"
                  />

                  {/*Sauna's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.sauna")} />}
                    label="Sauna"
                  />

                  {/*Gym's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.gym")} />}
                    label="Academia"
                  />

                  {/*Play room's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.playRoom")} />}
                    label="Espaço Teens"
                  />

                  {/*Baby room's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.babyRoom")} />}
                    label="Espaço Baby"
                  />

                  {/*Games room's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.gamesRoom")} />}
                    label="Salão de jogos"
                  />

                  {/*Gourmet area's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.gourmetArea")} />}
                    label="Área gourmet"
                  />

                  {/*Party room's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.partyRoom")} />}
                    label="Salão de festas"
                  />

                  {/*Barbecue's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("services.barbecue")} />}
                    label="Churrasqueira"
                  />

                  {/*Swimming pool's field */}
                  <FormControlLabel
                    control={
                      <Checkbox {...register("services.swimmingPool")} />
                    }
                    label="Piscina"
                  />
                </FormGroup>
              </Stack>
            </Stack>

            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Segurança
            </Typography>
            <Stack direction="row" width="100%" spacing={4}>
              <Stack direction="column">
                <FormGroup>
                  {/*Safety 24 hours's field */}
                  <FormControlLabel
                    control={
                      <Checkbox {...register("security.safety24hours")} />
                    }
                    label="Segurança 24 horas"
                  />

                  {/*Gated condominium's field */}
                  <FormControlLabel
                    control={
                      <Checkbox {...register("security.gatedCondominium")} />
                    }
                    label="Condomínio fechado"
                  />

                  {/*Intercom's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("security.intercom")} />}
                    label="Interfone"
                  />
                </FormGroup>
              </Stack>
              <Stack direction="column">
                <FormGroup>
                  {/*Alarm system's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("security.alarmSystem")} />}
                    label="Alarme"
                  />

                  {/*Watcher's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("security.watcher")} />}
                    label="Vigia"
                  />
                </FormGroup>
              </Stack>
            </Stack>

            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Venda/Locação
            </Typography>
            <Stack direction="column">
              <Stack direction="row" spacing={2}>
                <FormGroup>
                  {/*Selling's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("status.selling")} />}
                    label="Venda"
                  />
                </FormGroup>
                {sellingWatcher && (
                  <Stack direction="column">
                    {/*Selling price's field */}
                    <TextField
                      {...register("values.sellingPrice", {
                        validate: (value) =>
                          value >= 0 || "Somente números positivos",
                        valueAsNumber: true,
                      })}
                      label="Preço"
                      variant="outlined"
                      type="number"
                    />
                    <Typography
                      paragraph={true}
                      gutterBottom={true}
                      color="error.main"
                    >
                      {errors.values?.sellingPrice?.message}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Stack direction="column">
              <Stack direction="row">
                <FormGroup>
                  {/*Rental's field */}
                  <FormControlLabel
                    control={<Checkbox {...register("status.rental")} />}
                    label="Locação"
                  />
                </FormGroup>
                {rentalWatcher && (
                  <Stack direction="column">
                    {/*Rental price's field */}
                    <TextField
                      {...register("values.rentalPrice", {
                        validate: (value) =>
                          value >= 0 || "Somente números positivos",
                        valueAsNumber: true,
                      })}
                      label="Preço"
                      variant="outlined"
                      type="number"
                    />
                    <Typography
                      paragraph={true}
                      gutterBottom={true}
                      color="error.main"
                    >
                      {errors.values?.rentalPrice?.message}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>

            <Typography variant="h5" gutterBottom={true} color="primary.main">
              Fotos
            </Typography>
            <Button
              type="button"
              color="primary"
              variant="outlined"
            >
              {/*Image's field */}
              <input
                {...register("images")}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  handleFileInput(e);
                }}
              />
            </Button>
            <Typography paragraph={true} gutterBottom={true} color="error.main">
              {errors.images?.message}
            </Typography>
            <ImageList sx={{ width: "100%" }} cols={3} rowHeight={200} gap={1}>
              {imageFiles.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    className={styles.img}
                    src={image}
                    alt={`imagem ${index}`}
                    loading="lazy"
                  />
                  <IconButton
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={!isValid}
          >
            Criar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default NewAsset;
