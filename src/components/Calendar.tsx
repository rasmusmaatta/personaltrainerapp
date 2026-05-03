import { useEffect, useState } from "react";
import { Calendar,  } from "react-big-calendar";
import type { TrainingData } from "../types";
import { fetchTraining } from "../trainingapi";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";


const localizer = momentLocalizer(moment);

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource: {
        activity: string;
        duration: number;
        customer: {
            firstname: string;
            lastname: string;
        };
    };
}

function CalendarComponent() {
    const [, setTrainings] = useState<TrainingData[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<"month" | "week" | "day" | "agenda">("month");

    const getTraining = () => {
        setLoading(true);
        fetchTraining()
            .then((data) => {
                const trainingsData = Array.isArray(data)
                    ? data
                    : data._embedded?.trainings || data._embedded?.training || [];
                setTrainings(trainingsData);

                // Convert trainings to calendar events
                const calendarEvents: CalendarEvent[] = trainingsData.map(
                    (training: TrainingData, index: number) => {
                        const startDate = new Date(training.date);
                        const endDate = new Date(
                            startDate.getTime() + training.duration * 60000
                        );

                        return {
                            id: String(index),
                            title: `${training.activity} - ${training.customer?.firstname || ""} ${training.customer?.lastname || ""}`,
                            start: startDate,
                            end: endDate,
                            resource: {
                                activity: training.activity,
                                duration: training.duration,
                                customer: {
                                    firstname: training.customer?.firstname || "",
                                    lastname: training.customer?.lastname || "",
                                },
                            },
                        };
                    }
                );

                setEvents(calendarEvents);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load trainings");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getTraining();
    }, []);

    const handleSelectEvent = (event: CalendarEvent) => {
        const message = `Activity: ${event.resource.activity}\nCustomer: ${event.resource.customer.firstname} ${event.resource.customer.lastname}\nDuration: ${event.resource.duration} minutes`;
        alert(message);
    };

    const EventStyleGetter = (_event: CalendarEvent) => {
        const style = {
            backgroundColor: "#ed6c02",
            borderRadius: "5px",
            opacity: 0.8,
            color: "white",
            border: "0px",
            display: "block",
        };

        return {
            style: style,
        };
    };

    if (loading) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography>Loading trainings...</Typography>
            </Box>
        );
    }

    const formats = {
        timeGutterFormat: "HH:mm",
        eventTimeRangeFormat: ({ start }: { start: Date }) => {
            return `${moment(start).format("HH:mm")}`;
        },
        agendaHeaderFormat: ({ start }: { start: Date }) => {
            return `${moment(start).format("DD/MM/YYYY HH:mm")}`;
        },
        agendaTimeFormat: "HH:mm",
        dayFormat: "DD/MM",
        dayRangeHeaderFormat: ({ start }: { start: Date }) => {
            return `${moment(start).format("DD/MM/YYYY")}`;
        },
        monthHeaderFormat: "MMMM YYYY",
        dayHeaderFormat: "dddd DD/MM",
        weekdayFormat: "ddd",
    };

    return (
        <Box sx={{ p: 1 }}>
            {error && (
                <Paper sx={{ p: 2, mb: 2, backgroundColor: "#ED6C02" }}>
                    <Typography color="primary">{error}</Typography>
                </Paper>
            )}
            <Paper sx={{ height: "calc(100vh - 100px)" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={EventStyleGetter}
                    popup
                    views={["month", "week", "day", "agenda"]}
                    defaultView="month"
                    toolbar={true}
                    date={date}
                    onNavigate={setDate}
                    view={view}
                    onView={(newView) => setView(newView as "month" | "week" | "day" | "agenda")}
                    formats={formats}
                />
            </Paper>
        </Box>
    );
}

export default CalendarComponent;